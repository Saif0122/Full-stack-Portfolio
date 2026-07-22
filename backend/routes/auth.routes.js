import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validateRegistration } from '../validators/auth.validator.js';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', validateRegistration, register);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user & get token
 * @access Public
 */
router.post('/login', login);

export default router;
