import fs from 'fs';
import path from 'path';
import { StorageProvider } from './storage.provider.js';

export class LocalStorageProvider extends StorageProvider {
  constructor() {
    super();
    this.uploadDir = path.join(process.cwd(), 'uploads');
    
    // Ensure uploads directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(fileBuffer, fileName) {
    const filePath = path.join(this.uploadDir, fileName);
    await fs.promises.writeFile(filePath, fileBuffer);
    return `/uploads/${fileName}`; // Local path reference
  }

  async getSecureUrl(filePath) {
    // For local storage, we don't generate signed URLs like S3.
    // Instead, we return a special internal path that the download controller will stream.
    return filePath;
  }

  async getFileStream(fileRef) {
    // Extract filename from the reference (e.g., /uploads/file.zip -> file.zip)
    const fileName = path.basename(fileRef);
    const absolutePath = path.join(this.uploadDir, fileName);
    
    if (!fs.existsSync(absolutePath)) {
      throw new Error('File not found on server');
    }

    return {
      stream: fs.createReadStream(absolutePath),
      fileName,
      size: fs.statSync(absolutePath).size
    };
  }
}
