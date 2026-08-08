import express from 'express';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, getFeaturedProducts } from '../controllers/products.controller.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/featured')
  .get(getFeaturedProducts);

router.route('/slug/:slug')
  .get(getProductBySlug);

router.route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
