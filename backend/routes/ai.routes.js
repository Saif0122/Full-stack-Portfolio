import express from 'express';
import * as aiController from '../controllers/ai.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// All AI routes require authentication
router.use(protect);

// Generation endpoint (available to roles that have AI access, e.g., Admin, Author, Editor)
router.post('/generate', requireRole(['Admin', 'Super Admin', 'Author', 'Editor']), aiController.generate);

// Prompts access
router.get('/prompts', requireRole(['Admin', 'Super Admin', 'Author']), aiController.getPrompts);

// Settings (Admin only)
router.get('/settings', requireRole(['Admin', 'Super Admin']), aiController.getSettings);
router.put('/settings', requireRole(['Admin', 'Super Admin']), aiController.updateSettings);

export default router;
