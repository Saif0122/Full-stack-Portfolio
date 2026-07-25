import { TagRepository } from '../repositories/tag.repository.js';

const tagRepo = new TagRepository();

export class TagService {
  async getAllTags() {
    return await tagRepo.findAll();
  }

  async getTagById(id) {
    return await tagRepo.findById(id);
  }

  async getTagBySlug(slug) {
    return await tagRepo.findBySlug(slug);
  }

  async createTag(data) {
    return await tagRepo.create(data);
  }

  async updateTag(id, data) {
    return await tagRepo.update(id, data);
  }

  async deleteTag(id) {
    return await tagRepo.delete(id);
  }
}
