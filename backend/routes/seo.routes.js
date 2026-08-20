import { Router } from 'express';
import {
  getAllConfigs,
  getConfig,
  getGlobalDefaults,
  updateGlobalDefaults,
  updateConfig,
  deleteConfig,
  getSitemapManifest,
  scanBrokenLinks,
  validateAllConfigs,
  getVersionHistory,
} from '../controllers/seo.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = Router();

// ── Public Routes ─────────────────────────────────────────────────────────────
// These are called by the Next.js frontend (server components) to fetch SEO config.
router.get('/config', getConfig);               // GET /api/seo/config?path=/blog
router.get('/global', getGlobalDefaults);       // GET /api/seo/global

// ── Admin-Protected Routes ────────────────────────────────────────────────────
router.use(protect, restrictTo('admin'));

router.get('/',           getAllConfigs);        // GET  /api/seo
router.post('/',          updateConfig);         // POST /api/seo  (upsert by path)
router.put('/global',     updateGlobalDefaults); // PUT  /api/seo/global
router.post('/validate',  validateAllConfigs);   // POST /api/seo/validate  (run SEO scan)
router.get('/sitemap',    getSitemapManifest);   // GET  /api/seo/sitemap
router.get('/scan',       scanBrokenLinks);      // GET  /api/seo/scan
router.get('/:path/versions', getVersionHistory); // GET /api/seo/:path/versions
router.delete('/:path',   deleteConfig);         // DELETE /api/seo/:path

export default router;
