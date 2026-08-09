import express from 'express';
import { 
  getAllPosts, getPost, getPostBySlug, createPost, updatePost, deletePost,
  bulkPublish, bulkDelete, duplicatePost, togglePin,
  incrementView, toggleLike, toggleBookmark
} from '../controllers/post.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/slug/:slug', getPostBySlug);
router.get('/:id', getPost);
router.post('/:id/view', incrementView);

// Protected routes (User Engagement)
router.post('/:id/like', protect, toggleLike);
router.post('/:id/bookmark', protect, toggleBookmark);

// Admin routes
router.post('/', protect, requireRole(['Admin', 'Super Admin', 'Editor', 'Author']), createPost);
router.put('/:id', protect, requireRole(['Admin', 'Super Admin', 'Editor', 'Author']), updatePost);
router.delete('/:id', protect, requireRole(['Admin', 'Super Admin', 'Editor']), deletePost);

router.post('/admin/bulk-publish', protect, requireRole(['Admin', 'Super Admin', 'Editor']), bulkPublish);
router.post('/admin/bulk-delete', protect, requireRole(['Admin', 'Super Admin', 'Editor']), bulkDelete);
router.post('/:id/duplicate', protect, requireRole(['Admin', 'Super Admin', 'Editor', 'Author']), duplicatePost);
router.patch('/:id/pin', protect, requireRole(['Admin', 'Super Admin', 'Editor']), togglePin);

export default router;
