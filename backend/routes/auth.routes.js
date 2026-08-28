import express from 'express';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import { login, register, logout, refresh, getMe, oauthCallback } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validateRegistration, validateLogin } from '../validators/auth.validator.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again after 15 minutes'
});

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', authLimiter, validateRegistration, register);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user & get token
 * @access Public
 */
router.post('/login', authLimiter, validateLogin, login);
router.get('/csrf', (req, res) => res.json({ csrfToken: req.csrfToken }));
router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/me', protect, getMe);

// OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), oauthCallback);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login', session: false }), oauthCallback);

export default router;
