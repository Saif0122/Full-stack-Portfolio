import Joi from 'joi';
import validate from '../middleware/validate.middleware.js';

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateRegistration = validate(registerSchema);
export const validateLogin = validate(loginSchema);
