import { LocalStorageProvider } from './local.provider.js';

export class StorageFactory {
  static getProvider(providerName = process.env.STORAGE_PROVIDER || 'local') {
    switch (providerName) {
      case 'local':
        return new LocalStorageProvider();
      case 's3':
        // return new S3StorageProvider(); // To be implemented
        throw new Error('S3 Storage not implemented yet');
      default:
        throw new Error(`Unsupported storage provider: ${providerName}`);
    }
  }
}
