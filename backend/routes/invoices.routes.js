import express from 'express';
import * as invoicesController from '../controllers/invoices.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, invoicesController.getUserInvoices);
router.get('/:invoiceNumber', protect, invoicesController.getInvoice);

export default router;
