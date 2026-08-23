import express from 'express';
import { getSchemaConfig, updateSchemaConfig } from '../controllers/schema-config.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getSchemaConfig); // Public for backend generation purposes, but we can secure it or use a separate public vs admin endpoint. Actually, we might need public access if the frontend needs to fetch it, but usually, backend generates schemas. We'll leave it public for reading.
router.put('/', protect, restrictTo('admin'), updateSchemaConfig);

export default router;
