import express from 'express';
import * as mediaController from '../controllers/media.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';
import { upload } from '../config/multer.config.js';

const router = express.Router();

router.get('/', mediaController.getAllMedia);
router.get('/:id', mediaController.getMedia);

// Protected CMS routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.post('/', upload.single('file'), mediaController.uploadMedia);
router.put('/:id', mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);

export default router;
