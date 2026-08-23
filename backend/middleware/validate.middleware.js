import Joi from 'joi';

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    if (!schema) {
      return next();
    }
    
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });
    
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message: `Validation Error: ${errorMessage}`,
        errors: error.details,
      });
    }
    
    req[source] = value;
    next();
  };
};

export default validate;
