import Category from '../models/category.model.js';

export class CategoryRepository {
  async findAll() {
    return await Category.find({});
  }

  async findBySlug(slug) {
    return await Category.findOne({ slug });
  }

  async create(data) {
    return await Category.create(data);
  }
}
