import { DownloadRepository } from '../repositories/download.repository.js';
import { LicenseRepository } from '../repositories/license.repository.js';

const downloadRepo = new DownloadRepository();
const licenseRepo = new LicenseRepository(); // Assume it exists

export class DownloadService {
  async getProductDownloads(productId) {
    return await downloadRepo.findByProduct(productId);
  }

  async generateSecureLink(userId, productId) {
    // Note: generateSecureLink returns a one-time token or internal path
    const licenses = await licenseRepo.findAll({ user: userId, product: productId, status: 'active' });
    if (!licenses || licenses.length === 0) {
      throw new Error('Not authorized to access this product');
    }

    const { ProductRepository } = await import('../repositories/product.repository.js');
    const productRepo = new ProductRepository();
    const product = await productRepo.findById(productId);
    
    if (!product || !product.localFileUrl) {
      throw new Error('Download file not available for this product');
    }

    // In a real app, generate a secure signed JWT as a download token. 
    // Here we just use a download record ID to track it.
    const downloadRecord = await downloadRepo.create({
      product: productId,
      version: product.version || '1.0.0',
      fileUrl: product.localFileUrl,
      downloadCount: 0
    });

    return `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/downloads/${downloadRecord._id}`;
  }

  async downloadProduct(userId, downloadId) {
    const download = await downloadRepo.findById(downloadId);
    if (!download) throw new Error('Download link invalid or expired');

    // Verify user owns a license for this product
    const licenses = await licenseRepo.findAll({ user: userId, product: download.product, status: 'active' });
    if (!licenses || licenses.length === 0) {
      throw new Error('Not authorized to download this product');
    }

    const { ProductRepository } = await import('../repositories/product.repository.js');
    const productRepo = new ProductRepository();
    const product = await productRepo.findById(download.product);

    // Verify Limits
    if (product.downloadLimit > 0 && download.downloadCount >= product.downloadLimit) {
       throw new Error(`Download limit of ${product.downloadLimit} reached.`);
    }

    // Increment count
    await downloadRepo.incrementDownloadCount(downloadId);
    
    const { StorageFactory } = await import('./storage/storage.factory.js');
    const storageProvider = StorageFactory.getProvider();
    
    return await storageProvider.getFileStream(download.fileUrl);
  }
  
  async createDownload(data) {
    return await downloadRepo.create(data);
  }
}
