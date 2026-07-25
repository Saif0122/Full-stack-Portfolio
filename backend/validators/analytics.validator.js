import Joi from 'joi';

export const analyticsValidationSchema = Joi.object({
  event: Joi.string().required(),
  targetId: Joi.string().optional().allow(''),
  path: Joi.string().optional(),
  visitorId: Joi.string().optional(),
  device: Joi.string().optional(),
  browser: Joi.string().optional(),
  source: Joi.string().optional(),
  country: Joi.string().optional(),
  duration: Joi.number().optional(),
  metadata: Joi.object().optional()
});
