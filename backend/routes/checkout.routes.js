import express from 'express';
import * as checkoutController from '../controllers/checkout.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, checkoutController.checkout);

export default router;
