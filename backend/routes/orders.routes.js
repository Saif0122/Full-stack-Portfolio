import express from 'express';
import { getOrders, createOrder } from '../controllers/orders.controller.js';

const router = express.Router();

router.route('/')
  .get(getOrders)
  .post(createOrder);

export default router;
