import express from 'express';
import { getMessages, getMessage, createMessage, updateMessage, deleteMessage } from '../controllers/message.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';
import { validateMessage } from '../validators/message.validator.js';

const router = express.Router();

// Public route to submit messages
router.post('/', validateMessage, createMessage);

// Protected routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.get('/', getMessages);
router.get('/:id', getMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;
