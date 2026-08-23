import Joi from 'joi';
import validate from '../middleware/validate.middleware.js';

export const messageSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().max(200).optional().allow(''),
  message: Joi.string().min(10).max(5000).required(),
  status: Joi.string().valid('unread', 'read', 'replied').optional()
});

export const validateMessage = validate(messageSchema);
