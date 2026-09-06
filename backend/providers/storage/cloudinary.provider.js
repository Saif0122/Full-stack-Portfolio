import { StorageProvider } from './storage-provider.interface.js';
import cloudinary from '../../config/cloudinary.config.js';

export class CloudinaryProvider extends StorageProvider {
  /**
   * Upload an asset to Cloudinary.
   * @param {String|Buffer} fileInput - Data URI string or file buffer
   * @param {Object} metadata - Metadata such as filename, mimetype, folder
   * @param {Object} options - Additional Cloudinary options
   * @returns {Promise<Object>}
   */
  async upload(fileInput, metadata = {}, options = {}) {
    const folder = options.folder || metadata.folder || 'portfolio_media';

    let uploadPayload = fileInput;
    // If buffer is passed, convert to Data URI format for Cloudinary
    if (Buffer.isBuffer(fileInput)) {
      const mime = metadata.mimetype || 'image/jpeg';
      uploadPayload = `data:${mime};base64,${fileInput.toString('base64')}`;
    }

    const result = await cloudinary.uploader.upload(uploadPayload, {
      folder,
      resource_type: options.resource_type || 'auto',
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      ...options
    });

    return {
      publicId: result.public_id,
      url: result.secure_url,
      hash: result.etag || result.asset_id,
      size: result.bytes,
      width: result.width,
      height: result.height,
      format: result.format,
      resourceType: result.resource_type
    };
  }

  /**
   * Delete an asset from Cloudinary.
   * @param {String} publicId - The Cloudinary public_id
   * @returns {Promise<void>}
   */
  async delete(publicId) {
    if (!publicId) return;
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error(`Failed to delete Cloudinary asset ${publicId}:`, error);
    }
  }

  /**
   * Generate standard CDN URL for the asset.
   * @param {String} publicId 
   * @returns {String}
   */
  generateUrl(publicId) {
    return cloudinary.url(publicId, { secure: true });
  }

  /**
   * Generate responsive variant URLs using Cloudinary transformation.
   * @param {String} publicId 
   * @returns {Promise<Array<{width: Number, url: String}>>}
   */
  async generateResponsiveVariants(publicId) {
    const breakpoints = [320, 480, 640, 768, 1024, 1280, 1536, 1920];
    return breakpoints.map((width) => ({
      width,
      url: cloudinary.url(publicId, {
        crop: 'scale',
        width,
        quality: 'auto',
        fetch_format: 'auto',
        secure: true
      })
    }));
  }

  /**
   * Generate Open Graph Image URL (1200x630).
   * @param {String} publicId 
   * @returns {Promise<String>}
   */
  async generateOpenGraphImage(publicId) {
    return cloudinary.url(publicId, {
      crop: 'fill',
      width: 1200,
      height: 630,
      gravity: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
      secure: true
    });
  }
}
