import { PortfolioRepository } from '../repositories/portfolio.repository.js';

const portfolioRepo = new PortfolioRepository();

export class PortfolioService {
  async getAllSections() {
    return await portfolioRepo.findAll();
  }

  async getSection(section) {
    return await portfolioRepo.findBySection(section);
  }

  async createSection(data) {
    return await portfolioRepo.create(data);
  }

  async updateSection(section, data) {
    return await portfolioRepo.update(section, data);
  }

  async deleteSection(section) {
    return await portfolioRepo.delete(section);
  }
}
