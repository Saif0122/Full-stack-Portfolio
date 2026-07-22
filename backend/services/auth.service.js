import * as userRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';

/**
 * Business logic for registering a user
 */
export const registerUser = async (name, email, password) => {
  // 1. Check if user already exists
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // 2. Hash password (normally handled in model pre-save hook or here)
  // For boilerplate, we'll assume it's handled in the model or skipped.

  // 3. Create user via repository
  const newUser = await userRepository.createUser({ name, email, password });

  // 4. Generate Token (mock implementation)
  const token = generateToken(newUser._id);

  return {
    user: { id: newUser._id, name: newUser.name, email: newUser.email },
    token
  };
};

/**
 * Business logic for logging in a user
 */
export const loginUser = async (email, password) => {
  // 1. Find user by email
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // 2. Verify password (mock check)
  // const isMatch = await user.matchPassword(password);
  // if (!isMatch) throw new Error('Invalid credentials');

  // 3. Generate Token
  const token = generateToken(user._id);

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token
  };
};

// Helper function
const generateToken = (id) => {
  // In a real scenario, use process.env.JWT_SECRET
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d'
  });
};
