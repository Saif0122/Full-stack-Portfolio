import express from 'express';
import { getNewsletters, getNewsletter, createNewsletter, updateNewsletter, deleteNewsletter } from '../controllers/newsletter.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route to subscribe
router.post('/', createNewsletter);

// Protected routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.get('/', getNewsletters);
router.get('/:id', getNewsletter);
router.put('/:id', updateNewsletter);
router.delete('/:id', deleteNewsletter);

export default router;
