import Joi from 'joi';

export const couponValidationSchema = Joi.object({
  code: Joi.string().uppercase().required(),
});
