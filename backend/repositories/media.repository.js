import Media from '../models/media.model.js';

export class MediaRepository {
  async findAll(query = {}) {
    return await Media.find(query);
  }

  async findById(id) {
    return await Media.findById(id);
  }

  async create(data) {
    return await Media.create(data);
  }

  async update(id, data) {
    return await Media.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Media.findByIdAndDelete(id);
  }
}
