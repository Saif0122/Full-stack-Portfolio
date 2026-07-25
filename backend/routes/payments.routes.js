import express from 'express';
import * as paymentsController from '../controllers/payments.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/history', protect, paymentsController.getUserPayments);
router.post('/webhook/:provider', paymentsController.handleWebhook);

export default router;
