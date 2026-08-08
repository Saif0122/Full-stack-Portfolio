import { ProductService } from '../services/products.service.js';

const productService = new ProductService();

export const getProducts = async (req, res, next) => {
  try {
    const data = await productService.getStoreProducts(req.query);
    res.status(200).json({ success: true, ...data }); // data contains products & pagination
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const data = await productService.getFeaturedProducts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const data = await productService.getProductDetails(slug);
    if (!data) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = await productService.addProduct(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    // Basic implementation since service.update isn't explicitly defined yet, we can use Mongoose Model directly or add it to service.
    // Assuming product.service.js has update or we can add it there. Wait, I'll just use the repo.
    const { ProductRepository } = await import('../repositories/product.repository.js');
    const repo = new ProductRepository();
    const data = await repo.update(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { ProductRepository } = await import('../repositories/product.repository.js');
    const repo = new ProductRepository();
    await repo.delete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};
