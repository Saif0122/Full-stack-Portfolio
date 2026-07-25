import Joi from 'joi';

export const dashboardWidgetValidationSchema = Joi.object({
  widgetId: Joi.string().required(),
  title: Joi.string().required(),
  category: Joi.string().valid('analytics', 'commerce', 'content', 'system', 'ai').required(),
  metricType: Joi.string().required(),
  position: Joi.number().optional(),
  width: Joi.string().valid('1/4', '1/3', '1/2', '2/3', '3/4', 'full').optional(),
  isVisible: Joi.boolean().optional(),
  config: Joi.object().optional()
});
