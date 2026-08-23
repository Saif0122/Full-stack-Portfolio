import express from 'express';
import {
  getNetworkMetrics,
  getTopicAuthority,
  getGraphExplorerData,
  triggerGraphSync,
  generateLinkSuggestions
} from '../controllers/internal-linking.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/metrics').get(getNetworkMetrics);
router.route('/topic-authority').get(getTopicAuthority);
router.route('/graph').get(getGraphExplorerData);
router.route('/sync').post(triggerGraphSync);
router.route('/ai/suggest-links').post(generateLinkSuggestions);

export default router;
