import express from 'express';
import { getAllPosts, getPost, getPostBySlug, createPost, updatePost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getAllPosts)
  .post(createPost); // Ideally protected, but for demo it's open

router.route('/slug/:slug')
  .get(getPostBySlug);

router.route('/:id')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

export default router;
