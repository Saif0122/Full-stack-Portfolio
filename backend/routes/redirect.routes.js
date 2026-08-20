import express from 'express';
import {
  getRedirects,
  getActiveRedirects,
  createRedirect,
  updateRedirect,
  deleteRedirect,
  getNotFoundLogs,
  logNotFound
} from '../controllers/redirect.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/active', getActiveRedirects); // Used by Next.js middleware
router.post('/404', logNotFound); // Used by Next.js not-found.tsx

// Admin protected routes
router.use(protect);
router.use(authorize('admin', 'super-admin'));

router.route('/')
  .get(getRedirects)
  .post(createRedirect);

router.route('/:id')
  .put(updateRedirect)
  .delete(deleteRedirect);

router.get('/logs/404', getNotFoundLogs);

export default router;
