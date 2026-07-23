import { LicenseRepository } from '../repositories/license.repository.js';

export class LicensesService {
  constructor() {
    this.licenseRepository = new LicenseRepository();
  }

  async getLicensesByUser(userId) {
    return await this.licenseRepository.findByUserId(userId);
  }

  async generateLicense(productId, userId, type) {
    // Placeholder for actual license key generation logic
    const key = `LIC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const data = {
      key,
      productId,
      userId,
      type,
      status: 'active'
    };
    return await this.licenseRepository.create(data);
  }
}
