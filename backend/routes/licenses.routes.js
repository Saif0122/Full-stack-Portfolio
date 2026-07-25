import express from 'express';
import * as licensesController from '../controllers/licenses.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, licensesController.getLicenses);
router.post('/validate', licensesController.validateLicense);

export default router;
