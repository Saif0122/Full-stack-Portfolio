import express from 'express';
import * as checkoutController from '../controllers/checkout.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, checkoutController.checkout);

// Note: Webhook endpoint needs raw body for Stripe signature validation
router.post('/webhook', express.raw({ type: 'application/json' }), checkoutController.webhook);

export default router;
