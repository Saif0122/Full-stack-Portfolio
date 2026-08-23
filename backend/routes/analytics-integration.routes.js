import express from 'express';
import { analyticsIntegrationController } from '../controllers/analytics-integration.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply auth middleware to all routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', analyticsIntegrationController.getDashboardData);
router.post('/sync', analyticsIntegrationController.syncProviders);
router.get('/snapshots/:providerId', analyticsIntegrationController.getProviderSnapshots);
router.get('/ai-recommendations', analyticsIntegrationController.getAiRecommendations);

export default router;
