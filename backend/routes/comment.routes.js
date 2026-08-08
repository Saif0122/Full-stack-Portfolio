import express from 'express';
import {
  getPostComments,
  addComment,
  toggleCommentLike,
  reportComment,
  getAllComments,
  moderateComment
} from '../controllers/comment.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/post/:postId', getPostComments);

// Protected routes (User)
router.post('/post/:postId', protect, addComment);
router.post('/:id/like', protect, toggleCommentLike);
router.post('/:id/report', protect, reportComment);

// Admin routes
router.get('/admin/all', protect, restrictTo('Admin', 'Super Admin', 'Editor'), getAllComments);
router.patch('/admin/:id/moderate', protect, restrictTo('Admin', 'Super Admin', 'Editor'), moderateComment);

export default router;
