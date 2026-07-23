import License from '../models/license.model.js';

export class LicenseRepository {
  async findByUserId(userId) {
    return await License.find({ userId });
  }

  async findByKey(key) {
    return await License.findOne({ key });
  }

  async create(data) {
    return await License.create(data);
  }
}
