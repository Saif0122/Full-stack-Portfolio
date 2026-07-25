import express from 'express';
import * as portfolioController from '../controllers/portfolio.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', portfolioController.getAllSections);
router.get('/:section', portfolioController.getSection);

// Protected CMS routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.post('/', portfolioController.createSection);
router.put('/:section', portfolioController.updateSection);
router.delete('/:section', portfolioController.deleteSection);

export default router;
