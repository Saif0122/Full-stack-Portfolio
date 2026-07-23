import express from 'express';
import { getCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.route('/')
  .get(getCart);

export default router;
