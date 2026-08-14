import request from 'supertest';
import app from '../../app.js';
import mongoose from 'mongoose';
import User from '../../models/User.js';

describe('Auth API Endpoints', () => {
  let mockUserToken;
  let testUser;

  beforeEach(async () => {
    // Ensure clean state
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully (201)', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
      });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.token).toBeDefined();
      
      const userInDb = await User.findOne({ email: 'test@example.com' });
      expect(userInDb).not.toBeNull();
    });

    it('should fail with validation errors for invalid data (400)', async () => {
      const res = await request(app).post('/api/auth/register').send({
        email: 'not-an-email',
        password: '123',
      });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty('errors');
    });

    it('should prevent duplicate email registration (409)', async () => {
      // Register first
      await request(app).post('/api/auth/register').send({
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'Password123!',
      });
      
      // Try again
      const res = await request(app).post('/api/auth/register').send({
        name: 'Another User',
        email: 'duplicate@example.com',
        password: 'Password123!',
      });
      
      expect(res.statusCode).toBe(409); // Or 400 depending on specific implementation
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/auth/register').send({
        name: 'Login Test',
        email: 'login@example.com',
        password: 'Password123!',
      });
    });

    it('should login successfully with correct credentials (200)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'login@example.com',
        password: 'Password123!',
      });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      
      // Cookie check for refresh token
      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toMatch(/refreshToken/);
    });

    it('should reject incorrect credentials (401)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'login@example.com',
        password: 'WrongPassword!',
      });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
