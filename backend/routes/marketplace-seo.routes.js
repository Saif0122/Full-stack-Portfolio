import express from 'express';
import { getMarketplaceSeoOverview } from '../controllers/marketplace-seo.controller.js';

const router = express.Router();

router.get('/overview', getMarketplaceSeoOverview);

export default router;
