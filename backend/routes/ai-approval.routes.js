import express from 'express';
import { getPendingSuggestions, getAiStats, approveSuggestion, rejectSuggestion, rollbackSuggestion } from '../controllers/ai-approval.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.get('/pending', getPendingSuggestions);
router.get('/stats', getAiStats);
router.put('/:id/approve', approveSuggestion);
router.put('/:id/reject', rejectSuggestion);
router.post('/rollback/:snapshotId', rollbackSuggestion);

export default router;
