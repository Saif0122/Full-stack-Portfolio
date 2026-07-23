import * as authService from '../services/auth.service.js';

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie('jwt', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
};

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const result = await authService.registerUser(name, email, password);
    
    setCookies(res, result.accessToken, result.refreshToken);

    res.status(201).json({
      status: 'success',
      data: { user: result.user }
    });
  } catch (error) {
    res.status(400);
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
    
    const result = await authService.loginUser(email, password);
    
    setCookies(res, result.accessToken, result.refreshToken);

    res.status(200).json({
      status: 'success',
      data: { user: result.user }
    });
  } catch (error) {
    res.status(401);
    next(error);
  }
};

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    await authService.logoutUser(refreshToken);

    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.cookie('refreshToken', '', { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Refresh token
 * @route POST /api/auth/refresh
 */
export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Not authorized, no refresh token' });
    }

    const result = await authService.refreshToken(refreshToken);
    
    res.cookie('jwt', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.cookie('refreshToken', '', { httpOnly: true, expires: new Date(0) });
    res.status(401).json({ message: 'Refresh token failed' });
  }
};

/**
 * @desc Get current user profile
 * @route GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role?.name || 'Customer'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
