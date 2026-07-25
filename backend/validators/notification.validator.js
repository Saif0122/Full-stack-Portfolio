import Joi from 'joi';

export const notificationValidationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  type: Joi.string().valid('info', 'success', 'warning', 'error', 'system', 'order', 'ai').optional(),
  severity: Joi.string().valid('low', 'medium', 'high', 'critical').optional(),
  targetUrl: Joi.string().optional().allow(''),
  isRead: Joi.boolean().optional(),
  recipientRole: Joi.string().optional(),
  metadata: Joi.object().optional()
});
