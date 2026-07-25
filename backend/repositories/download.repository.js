import Download from '../models/download.model.js';

export class DownloadRepository {
  async findAll(query = {}) {
    return await Download.find(query).populate('product');
  }

  async findById(id) {
    return await Download.findById(id);
  }

  async findByProduct(productId) {
    return await Download.find({ product: productId, isActive: true }).sort({ releaseDate: -1 });
  }

  async create(data) {
    return await Download.create(data);
  }

  async update(id, data) {
    return await Download.findByIdAndUpdate(id, data, { new: true });
  }

  async incrementDownloadCount(id) {
    return await Download.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } }, { new: true });
  }
}
