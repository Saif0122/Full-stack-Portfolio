import express from 'express';
import * as mediaController from '../controllers/media-seo.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'editor'));

router.get('/audit', mediaController.getAuditStats);
router.get('/library', mediaController.getLibrary);

export default router;
