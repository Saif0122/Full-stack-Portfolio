import Seo from '../models/seo.model.js';

export class SeoRepository {
  async findAll(query = {}) {
    return await Seo.find(query).sort({ path: 1 });
  }

  async findByPath(path) {
    return await Seo.findOne({ path });
  }

  async create(data) {
    return await Seo.create(data);
  }

  async update(path, data) {
    return await Seo.findOneAndUpdate({ path }, data, { new: true, upsert: true });
  }

  async delete(path) {
    return await Seo.findOneAndDelete({ path });
  }
}
