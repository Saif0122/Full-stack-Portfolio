import express from 'express';
import rateLimit from 'express-rate-limit';
import { getMessages, getMessage, createMessage, updateMessage, deleteMessage } from '../controllers/message.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';
import { validateMessage } from '../validators/message.validator.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact requests per hour
  message: 'Too many contact requests from this IP, please try again after an hour'
});

// Public route to submit messages
router.post('/', contactLimiter, validateMessage, createMessage);

// Protected routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.get('/', getMessages);
router.get('/:id', getMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;
