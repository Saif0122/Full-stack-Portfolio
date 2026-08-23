import express from 'express';
import { localSeoController } from '../controllers/local-seo.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// Audit
router.get('/audit', localSeoController.getAuditStatus);

// Migrate
router.post('/migrate', localSeoController.triggerMigration);

// Profiles
router.get('/profiles', localSeoController.getProfiles);
router.post('/profiles', localSeoController.createProfile);
router.put('/profiles/:id', localSeoController.updateProfile);

// Locations
router.get('/locations', localSeoController.getLocations);
router.post('/locations', localSeoController.createLocation);

// Citations
router.get('/citations', localSeoController.getCitations);

// Keywords
router.get('/keywords', localSeoController.getKeywords);

export default router;
