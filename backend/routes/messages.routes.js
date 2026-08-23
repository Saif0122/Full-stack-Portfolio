import express from 'express';
import { submitContactForm } from '../controllers/messages.controller.js';
// We can use the existing rate limiter if we want, or a generic one, but let's just apply it here.
import rateLimit from 'express-rate-limit';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact requests per windowMs
  message: 'Too many contact requests from this IP, please try again after an hour'
});

router.post('/', contactLimiter, submitContactForm);

export default router;
