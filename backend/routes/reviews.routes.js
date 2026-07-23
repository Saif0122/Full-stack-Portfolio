import express from 'express';
import { getReviews } from '../controllers/reviews.controller.js';

const router = express.Router();

router.route('/')
  .get(getReviews);

export default router;
