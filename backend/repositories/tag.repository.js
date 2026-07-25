import Tag from '../models/tag.model.js';

export class TagRepository {
  async findAll(query = {}) {
    return await Tag.find(query);
  }

  async findById(id) {
    return await Tag.findById(id);
  }

  async findBySlug(slug) {
    return await Tag.findOne({ slug });
  }

  async create(data) {
    return await Tag.create(data);
  }

  async update(id, data) {
    return await Tag.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Tag.findByIdAndDelete(id);
  }
}
