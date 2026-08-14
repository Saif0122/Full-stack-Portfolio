import { jest } from '@jest/globals';
import * as authService from '../../services/auth.service.js';
import User from '../../models/user.model.js';
import Role from '../../models/role.model.js';
import Token from '../../models/token.model.js';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env.config.js';
import mongoose from 'mongoose';

describe('Auth Service', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Role.deleteMany({});
    await Token.deleteMany({});
  });

  describe('registerUser', () => {
    it('should register a new user and return tokens', async () => {
      const result = await authService.registerUser('Test User', 'test@example.com', 'password123');
      
      expect(result.user).toHaveProperty('id');
      expect(result.user.name).toBe('Test User');
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.role).toBe('Customer');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');

      const savedUser = await User.findOne({ email: 'test@example.com' });
      expect(savedUser).toBeTruthy();
      
      const savedToken = await Token.findOne({ userId: savedUser._id, type: 'refresh' });
      expect(savedToken).toBeTruthy();
      expect(savedToken.token).toBe(result.refreshToken);
    });

    it('should throw an error if user already exists', async () => {
      await authService.registerUser('Existing User', 'existing@example.com', 'password123');
      
      await expect(
        authService.registerUser('Another User', 'existing@example.com', 'password456')
      ).rejects.toThrow('User already exists');
    });
  });

  describe('loginUser', () => {
    it('should login a valid user and return tokens', async () => {
      await authService.registerUser('Login User', 'login@example.com', 'password123');
      
      const result = await authService.loginUser('login@example.com', 'password123');
      
      expect(result.user.email).toBe('login@example.com');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw an error for invalid email', async () => {
      await expect(
        authService.loginUser('wrong@example.com', 'password123')
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw an error for invalid password', async () => {
      await authService.registerUser('Login User', 'login2@example.com', 'password123');
      
      await expect(
        authService.loginUser('login2@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid email or password');
    });
  });

  describe('refreshToken', () => {
    it('should issue a new access token for a valid refresh token', async () => {
      const reg = await authService.registerUser('Refresh User', 'refresh@example.com', 'password123');
      
      const result = await authService.refreshToken(reg.refreshToken);
      expect(result).toHaveProperty('accessToken');
      
      const decoded = jwt.verify(result.accessToken, config.jwt.secret);
      expect(decoded.id).toBe(reg.user.id.toString());
    });

    it('should throw an error for an invalid refresh token', async () => {
      await expect(
        authService.refreshToken('invalid.token.here')
      ).rejects.toThrow('Not authorized, token failed');
    });

    it('should throw an error if refresh token not in db', async () => {
      const reg = await authService.registerUser('Refresh User 2', 'refresh2@example.com', 'password123');
      
      // Delete token from db
      await Token.deleteMany({});
      
      await expect(
        authService.refreshToken(reg.refreshToken)
      ).rejects.toThrow('Not authorized, token failed'); // Maps to "Invalid refresh token" internally then caught by catch block
    });
  });

  describe('logoutUser', () => {
    it('should delete the refresh token from db', async () => {
      const reg = await authService.registerUser('Logout User', 'logout@example.com', 'password123');
      
      let tokenDoc = await Token.findOne({ token: reg.refreshToken });
      expect(tokenDoc).toBeTruthy();
      
      await authService.logoutUser(reg.refreshToken);
      
      tokenDoc = await Token.findOne({ token: reg.refreshToken });
      expect(tokenDoc).toBeNull();
    });
  });
});
