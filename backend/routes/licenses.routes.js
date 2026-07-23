import express from 'express';
import { getLicenses } from '../controllers/licenses.controller.js';

const router = express.Router();

router.route('/')
  .get(getLicenses);

export default router;
