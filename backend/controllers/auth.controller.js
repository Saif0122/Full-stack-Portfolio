import * as authService from '../services/auth.service.js';

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Delegate business logic to service layer
    const result = await authService.registerUser(name, email, password);
    
    res.status(201).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    // Pass errors to global error handler
    next(error);
  }
};

/**
 * @desc Authenticate user
 * @route POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Delegate authentication logic to service layer
    const result = await authService.loginUser(email, password);
    
    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
