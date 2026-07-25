import express from 'express';
import * as settingController from '../controllers/setting.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', settingController.getAllSettings);
router.get('/:key', settingController.getSetting);

// Protected CMS routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.post('/', settingController.createSetting);
router.put('/:key', settingController.updateSetting);
router.delete('/:key', settingController.deleteSetting);

export default router;
