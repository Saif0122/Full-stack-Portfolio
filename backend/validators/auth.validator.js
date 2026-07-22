/**
 * Middleware to validate registration input
 * Normally you would use a library like Joi or Zod here.
 */
export const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name) errors.push('Name is required');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Valid email is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors
    });
  }

  next();
};
