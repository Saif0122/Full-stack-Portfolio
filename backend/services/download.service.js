import { DownloadRepository } from '../repositories/download.repository.js';
import { LicenseRepository } from '../repositories/license.repository.js';

const downloadRepo = new DownloadRepository();
const licenseRepo = new LicenseRepository(); // Assume it exists

export class DownloadService {
  async getProductDownloads(productId) {
    return await downloadRepo.findByProduct(productId);
  }

  async downloadProduct(userId, downloadId) {
    const download = await downloadRepo.findById(downloadId);
    if (!download) throw new Error('Download not found');

    // Verify user owns a license for this product
    const licenses = await licenseRepo.findAll({ user: userId, product: download.product, status: 'active' });
    if (!licenses || licenses.length === 0) {
      throw new Error('Not authorized to download this product');
    }

    // Increment count and return file URL (or stream)
    await downloadRepo.incrementDownloadCount(downloadId);
    return download.fileUrl;
  }
  
  async createDownload(data) {
    return await downloadRepo.create(data);
  }
}
