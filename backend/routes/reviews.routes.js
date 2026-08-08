import express from 'express';
import { getReviews, createReview } from '../controllers/reviews.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(protect, createReview);

export default router;
