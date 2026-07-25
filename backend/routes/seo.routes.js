import express from 'express';
import * as seoController from '../controllers/seo.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public read access for frontend SEO meta and dynamic sitemaps
router.get('/all', seoController.getAllConfigs);
router.get('/config', seoController.getConfig);
router.get('/sitemap-manifest', seoController.getSitemapManifest);

// Protected SEO Command Center execution routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.post('/scan-links', seoController.scanBrokenLinks);
router.put('/update', seoController.updateConfig);
router.delete('/:path', seoController.deleteConfig);

export default router;
