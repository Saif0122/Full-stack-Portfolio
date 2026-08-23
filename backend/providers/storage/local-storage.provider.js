import { StorageProvider } from './storage-provider.interface.js';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

export class LocalStorageProvider extends StorageProvider {
  constructor() {
    super();
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads');
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  }

  async ensureDirectory(dir) {
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  async upload(buffer, metadata, options = {}) {
    await this.ensureDirectory(this.uploadDir);

    // Hash calculation for fingerprinting
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    
    const ext = path.extname(metadata.filename) || '.jpg';
    const finalFilename = `${hash}${ext}`;
    const filePath = path.join(this.uploadDir, finalFilename);

    let processedBuffer = buffer;
    let finalSize = buffer.length;
    let width = null;
    let height = null;

    if (metadata.mimetype.startsWith('image/')) {
      const image = sharp(buffer);
      const metadata = await image.metadata();
      width = metadata.width;
      height = metadata.height;
      
      // Strip EXIF but keep copyright if configured (future)
      processedBuffer = await image
        .withMetadata({
           // Only keeping essential basic metadata, stripping others.
           // Sharp's default behavior with no args to withMetadata is actually to keep all.
           // To strip EXIF, we don't call withMetadata(), or we call it and explicitly drop things.
           // Wait, omitting withMetadata strips all metadata in sharp.
        })
        .toBuffer();
        
      // Explicit EXIF stripping (actually sharp strips by default if withMetadata is NOT called, 
      // but if we need copyright we would use withMetadata({ exif: ... }))
      // For now, strip all to save space as requested.
      processedBuffer = await sharp(buffer).toBuffer();
      finalSize = processedBuffer.length;
    }

    await fs.writeFile(filePath, processedBuffer);

    return {
      publicId: finalFilename,
      url: this.generateUrl(finalFilename),
      hash,
      size: finalSize,
      width,
      height
    };
  }

  async delete(publicId) {
    const filePath = path.join(this.uploadDir, publicId);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
  }

  generateUrl(publicId) {
    return `${this.baseUrl}/uploads/${publicId}`;
  }

  async generateResponsiveVariants(publicId) {
    const breakpoints = [320, 480, 640, 768, 1024, 1280, 1536, 1920];
    const variants = [];
    const sourcePath = path.join(this.uploadDir, publicId);
    
    try {
      await fs.access(sourcePath);
    } catch {
      return variants; // Source file missing
    }

    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    for (const width of breakpoints) {
      if (metadata.width && metadata.width >= width) {
        const ext = path.extname(publicId);
        const baseName = path.basename(publicId, ext);
        const variantFilename = `${baseName}-${width}w${ext}`;
        const variantPath = path.join(this.uploadDir, variantFilename);
        
        await image.clone().resize(width).toFile(variantPath);
        
        variants.push({
          width,
          url: this.generateUrl(variantFilename)
        });
      }
    }

    return variants;
  }

  async generateOpenGraphImage(publicId) {
    const sourcePath = path.join(this.uploadDir, publicId);
    const ext = path.extname(publicId);
    const baseName = path.basename(publicId, ext);
    const ogFilename = `${baseName}-og${ext}`;
    const ogPath = path.join(this.uploadDir, ogFilename);

    // Standard Open Graph dimensions (1200x630)
    try {
      await fs.access(sourcePath);
      await sharp(sourcePath)
        .resize(1200, 630, { fit: 'cover', position: 'center' })
        .toFile(ogPath);
      
      return this.generateUrl(ogFilename);
    } catch (e) {
      return this.generateUrl(publicId); // Fallback to original
    }
  }
}
