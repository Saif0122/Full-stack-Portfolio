import { jest } from '@jest/globals';
import { protect, requireRole } from '../../middleware/auth.middleware.js';
import jwt from 'jsonwebtoken';
import User from '../../models/user.model.js';
import { config } from '../../config/env.config.js';

describe('Auth Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    
    // Clear mocks
    jest.restoreAllMocks();
  });

  describe('protect', () => {
    it('should authenticate user via Bearer token', async () => {
      req.headers.authorization = 'Bearer validtoken';
      jest.spyOn(jwt, 'verify').mockReturnValue({ id: 'user123' });
      
      const mockUser = { _id: 'user123', role: { name: 'user' } };
      jest.spyOn(User, 'findById').mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockUser)
        })
      });

      await protect(req, res, next);
      
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it('should authenticate user via cookie', async () => {
      req.cookies.jwt = 'validtoken';
      jest.spyOn(jwt, 'verify').mockReturnValue({ id: 'user123' });
      
      const mockUser = { _id: 'user123', role: { name: 'admin' } };
      jest.spyOn(User, 'findById').mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockUser)
        })
      });

      await protect(req, res, next);
      
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it('should return 401 if no token provided', async () => {
      await protect(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid or expired', async () => {
      req.headers.authorization = 'Bearer invalidtoken';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('jwt expired');
      });

      await protect(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed or expired' });
    });

    it('should return 401 if user from token does not exist', async () => {
      req.headers.authorization = 'Bearer validtoken';
      jest.spyOn(jwt, 'verify').mockReturnValue({ id: 'user123' });
      
      jest.spyOn(User, 'findById').mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null)
        })
      });

      await protect(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('requireRole', () => {
    it('should allow access if user has required role', () => {
      req.user = { role: { name: 'admin' } };
      const middleware = requireRole(['admin']);
      
      middleware(req, res, next);
      
      expect(next).toHaveBeenCalled();
    });

    it('should allow access if roles passed as string', () => {
      req.user = { role: { name: 'admin' } };
      const middleware = requireRole('admin');
      
      middleware(req, res, next);
      
      expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user does not have required role', () => {
      req.user = { role: { name: 'user' } };
      const middleware = requireRole(['admin']);
      
      middleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: Requires one of [admin] roles' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if user has no role defined', () => {
      req.user = {};
      const middleware = requireRole(['admin']);
      
      middleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, missing role' });
    });
  });
});
