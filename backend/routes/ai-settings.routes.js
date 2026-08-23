import express from 'express';
import { getAiSettings, updateAiSettings } from '../controllers/ai-settings.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.route('/')
  .get(getAiSettings)
  .put(updateAiSettings);

export default router;
