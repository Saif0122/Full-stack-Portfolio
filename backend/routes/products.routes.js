import express from 'express';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, getFeaturedProducts, searchProducts } from '../controllers/products.controller.js';
import { validateProductForPublish } from '../middleware/product-seo-validator.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(validateProductForPublish, createProduct);

router.route('/search')
  .get(searchProducts);

router.route('/featured')
  .get(getFeaturedProducts);

router.route('/slug/:slug')
  .get(getProductBySlug);

router.route('/:id')
  .put(validateProductForPublish, updateProduct)
  .delete(deleteProduct);

export default router;
