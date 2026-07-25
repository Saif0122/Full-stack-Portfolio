import Project from '../models/project.model.js';

export class ProjectRepository {
  async findAll(query = {}) {
    return await Project.find(query).sort({ order: 1 });
  }

  async findById(id) {
    return await Project.findById(id);
  }

  async findBySlug(slug) {
    return await Project.findOne({ slug });
  }

  async create(data) {
    return await Project.create(data);
  }

  async update(id, data) {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Project.findByIdAndDelete(id);
  }
}
