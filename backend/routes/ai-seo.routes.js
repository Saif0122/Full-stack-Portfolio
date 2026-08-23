import express from 'express';
import { generateSeoMetadata, analyzeContentQuality, generateKeywordIntelligence } from '../controllers/ai-seo.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { aiRateLimiter } from '../middleware/ai-rate-limiter.js';

const router = express.Router();

router.use(protect, restrictTo('admin'), aiRateLimiter);

router.post('/generate-metadata', generateSeoMetadata);
router.post('/analyze-quality', analyzeContentQuality);
router.post('/keyword-intelligence', generateKeywordIntelligence);

export default router;
