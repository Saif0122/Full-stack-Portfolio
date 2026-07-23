import Joi from 'joi';

export const orderValidationSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      price: Joi.number().required(),
    })
  ).min(1).required(),
  coupon: Joi.string().optional(),
});
