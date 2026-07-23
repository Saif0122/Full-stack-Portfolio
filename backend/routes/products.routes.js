import express from 'express';
import { getProducts, getProductBySlug, createProduct } from '../controllers/products.controller.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:slug')
  .get(getProductBySlug);

export default router;
