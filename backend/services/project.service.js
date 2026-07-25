import { ProjectRepository } from '../repositories/project.repository.js';

const projectRepo = new ProjectRepository();

export class ProjectService {
  async getAllProjects() {
    return await projectRepo.findAll();
  }

  async getProjectById(id) {
    return await projectRepo.findById(id);
  }

  async getProjectBySlug(slug) {
    return await projectRepo.findBySlug(slug);
  }

  async createProject(data) {
    return await projectRepo.create(data);
  }

  async updateProject(id, data) {
    return await projectRepo.update(id, data);
  }

  async deleteProject(id) {
    return await projectRepo.delete(id);
  }
}
