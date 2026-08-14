import { jest } from '@jest/globals';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { generateLicense } from '../../utils/licenseGenerator.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import License from '../../models/license.model.js';

describe('Utils Unit Tests', () => {
  describe('ApiError', () => {
    it('should create an ApiError instance with default values', () => {
      const error = new ApiError(400);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Something went wrong');
      expect(error.success).toBe(false);
      expect(error.errors).toEqual([]);
      expect(error.data).toBeNull();
      expect(error.stack).toBeDefined();
    });

    it('should create an ApiError instance with provided values', () => {
      const error = new ApiError(404, 'Not Found', ['Resource missing'], 'custom stack');
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Not Found');
      expect(error.success).toBe(false);
      expect(error.errors).toEqual(['Resource missing']);
      expect(error.stack).toBe('custom stack');
    });
  });

  describe('ApiResponse', () => {
    it('should create a successful ApiResponse instance for status codes < 400', () => {
      const response = new ApiResponse(200, { user: 'test' }, 'User created');
      expect(response.statusCode).toBe(200);
      expect(response.data).toEqual({ user: 'test' });
      expect(response.message).toBe('User created');
      expect(response.success).toBe(true);
    });

    it('should create a failed ApiResponse instance for status codes >= 400', () => {
      const response = new ApiResponse(400, null, 'Bad Request');
      expect(response.statusCode).toBe(400);
      expect(response.success).toBe(false);
    });
  });

  describe('licenseGenerator', () => {
    beforeEach(async () => {
      await License.deleteMany({});
    });

    it('should generate a single_device license and save it to db', async () => {
      const userId = new mongoose.Types.ObjectId();
      const productId = new mongoose.Types.ObjectId();
      const orderId = new mongoose.Types.ObjectId();

      const key = await generateLicense(userId, productId, orderId, 'single_device');

      expect(typeof key).toBe('string');
      
      const decoded = jwt.verify(key, process.env.JWT_SECRET || 'nexus_default_secret_key_2026');
      expect(decoded.user).toBe(userId.toString());
      expect(decoded.type).toBe('single_device');

      const savedLicense = await License.findOne({ key });
      expect(savedLicense).toBeTruthy();
      expect(savedLicense.type).toBe('single_device');
      expect(savedLicense.status).toBe('active');
      expect(savedLicense.expiresAt).toBeDefined();
    });

    it('should generate an unlimited license with no expiry', async () => {
      const userId = new mongoose.Types.ObjectId();
      const productId = new mongoose.Types.ObjectId();
      const orderId = new mongoose.Types.ObjectId();

      const key = await generateLicense(userId, productId, orderId, 'unlimited');

      const savedLicense = await License.findOne({ key });
      expect(savedLicense.type).toBe('unlimited');
      expect(savedLicense.expiresAt).toBeNull();
    });

    it('should throw an error if license generation fails', async () => {
      // Intentionally passing null to trigger error during token sign/db save
      await expect(generateLicense(null, null, null)).rejects.toThrow('Failed to generate license key');
    });
  });
});
