import { ProductRepository } from '../repositories/product.repository.js';

const productRepo = new ProductRepository();

export class ProductService {
  async getStoreProducts() {
    return await productRepo.findAll({ isActive: true });
  }

  async getProductDetails(slug) {
    return await productRepo.findBySlug(slug);
  }

  async addProduct(data) {
    return await productRepo.create(data);
  }
}
