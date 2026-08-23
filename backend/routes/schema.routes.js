import express from 'express';
import { generateSchema, getSupportedSchemas } from '../controllers/schema.controller.js';

const router = express.Router();

router.get('/generate', generateSchema);
router.get('/supported', getSupportedSchemas);

export default router;
