import express from 'express';
import * as analyticsController from '../controllers/analytics.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public endpoint for non-blocking client traffic tracking
router.post('/track', analyticsController.logEvent);

// Protected executive dashboard metrics & events history
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.get('/summary', analyticsController.getSummaryMetrics);
router.get('/events', analyticsController.getAllEvents);

export default router;
