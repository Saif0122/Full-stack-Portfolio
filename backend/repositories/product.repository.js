import Product from '../models/product.model.js';

export class ProductRepository {
  async findAll(query = {}) {
    return await Product.find(query);
  }

  async findBySlug(slug) {
    return await Product.findOne({ slug });
  }

  async create(data) {
    return await Product.create(data);
  }
}
