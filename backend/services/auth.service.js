import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import Token from '../models/token.model.js';
import jwt from 'jsonwebtoken';

/**
 * Register a user
 */
export const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  let defaultRole = await Role.findOne({ name: 'Customer' });
  if (!defaultRole) {
    // Fallback if roles aren't seeded yet
    defaultRole = await Role.create({ name: 'Customer', description: 'Default customer role' });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    role: defaultRole._id,
  });

  const { accessToken, refreshToken } = generateTokens(newUser._id);

  // Store refresh token in DB
  await Token.create({
    userId: newUser._id,
    token: refreshToken,
    type: 'refresh',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return {
    user: { id: newUser._id, name: newUser.name, email: newUser.email, role: defaultRole.name },
    accessToken,
    refreshToken
  };
};

/**
 * Login a user
 */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).populate('role');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  user.lastLogin = new Date();
  await user.save();

  const { accessToken, refreshToken } = generateTokens(user._id);

  // Store refresh token
  await Token.create({
    userId: user._id,
    token: refreshToken,
    type: 'refresh',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role?.name || 'Customer' },
    accessToken,
    refreshToken
  };
};

/**
 * Refresh token
 */
export const refreshToken = async (tokenString) => {
  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_REFRESH_SECRET || 'refreshsecret123');
    
    // Check if token exists in DB
    const tokenDoc = await Token.findOne({ token: tokenString, type: 'refresh' });
    if (!tokenDoc) {
      throw new Error('Invalid refresh token');
    }

    const user = await User.findById(decoded.id).populate('role');
    if (!user) {
      throw new Error('User not found');
    }

    // Generate new access token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
      expiresIn: '15m'
    });

    return { accessToken };
  } catch (error) {
    throw new Error('Not authorized, token failed');
  }
};

/**
 * Logout
 */
export const logoutUser = async (tokenString) => {
  if (tokenString) {
    await Token.deleteOne({ token: tokenString, type: 'refresh' });
  }
};

const generateTokens = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '15m' // Short-lived access token
  });
  
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refreshsecret123', {
    expiresIn: '7d' // Long-lived refresh token
  });

  return { accessToken, refreshToken };
};
