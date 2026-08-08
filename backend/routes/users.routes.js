import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser, getWishlist, toggleWishlist } from '../controllers/users.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// User specific routes
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, toggleWishlist);

// Admin only routes
router.use(protect, requireRole(['Admin', 'Super Admin']));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
