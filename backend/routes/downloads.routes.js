import express from 'express';
import * as downloadsController from '../controllers/downloads.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/product/:productId', protect, downloadsController.getProductDownloads);
router.get('/:id', protect, downloadsController.downloadFile);

// Admin only
router.post('/', protect, requireRole(['Admin', 'Super Admin']), downloadsController.createDownload);

export default router;
