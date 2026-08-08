import express from 'express';
import { getOrders, createOrder, getMyOrders } from '../controllers/orders.controller.js';

import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/my-orders', protect, getMyOrders);

router.route('/')
  .get(protect, requireRole(['Admin', 'Super Admin']), getOrders)
  .post(protect, createOrder);

export default router;
