import express from 'express';
import { getSeoDashboardMetrics } from '../controllers/seo-dashboard.controller.js';
// Note: In a production app, import the authentication middleware to protect this route.
// import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Assuming admin protection would be applied here
router.route('/metrics').get(getSeoDashboardMetrics);
// e.g. router.route('/metrics').get(protect, authorize('admin'), getSeoDashboardMetrics);

export default router;
