import express from 'express';
import { generateProductSeoSuggestions } from '../controllers/ai-product-seo.controller.js';

const router = express.Router();

router.post('/generate', generateProductSeoSuggestions);

export default router;
