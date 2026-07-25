import express from 'express';
import * as tagController from '../controllers/tag.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTag);

// Protected CMS routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.post('/', tagController.createTag);
router.put('/:id', tagController.updateTag);
router.delete('/:id', tagController.deleteTag);

export default router;
