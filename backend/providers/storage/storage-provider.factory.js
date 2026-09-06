import { LocalStorageProvider } from './local-storage.provider.js';
import { CloudinaryProvider } from './cloudinary.provider.js';

export class StorageProviderFactory {
  static getProvider() {
    const activeProvider = process.env.STORAGE_PROVIDER || 'local';

    switch (activeProvider) {
      case 'local':
        return new LocalStorageProvider();
      case 'cloudinary':
        return new CloudinaryProvider();
      case 's3':
        throw new Error('AWS S3 Provider is not yet implemented.');
      case 'r2':
        throw new Error('Cloudflare R2 Provider is not yet implemented.');
      case 'vercel':
        throw new Error('Vercel Blob Provider is not yet implemented.');
      default:
        console.warn(`Unknown storage provider ${activeProvider}, falling back to local.`);
        return new LocalStorageProvider();
    }
  }
}
