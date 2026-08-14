import express from 'express';
import { 
  getAnalyticsSummary, 
  trackEvent, 
  endSession, 
  getRecruiterAnalytics, 
  getWebsiteAnalytics,
  getAiAnalytics,
  getMarketplaceAnalytics,
  getBlogAnalytics
} from '../controllers/analytics.controller.js';

const router = express.Router();

router.post('/track', trackEvent);
router.post('/session/end', endSession);
router.get('/summary', getAnalyticsSummary);
router.get('/recruiter', getRecruiterAnalytics);
router.get('/website', getWebsiteAnalytics);
router.get('/ai', getAiAnalytics);
router.get('/marketplace', getMarketplaceAnalytics);
router.get('/blog', getBlogAnalytics);

export default router;
