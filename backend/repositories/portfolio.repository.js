import Portfolio from '../models/portfolio.model.js';

export class PortfolioRepository {
  async findAll(query = {}) {
    return await Portfolio.find(query);
  }

  async findBySection(section) {
    return await Portfolio.findOne({ section });
  }

  async create(data) {
    return await Portfolio.create(data);
  }

  async update(section, data) {
    return await Portfolio.findOneAndUpdate({ section }, data, { new: true });
  }

  async delete(section) {
    return await Portfolio.findOneAndDelete({ section });
  }
}
