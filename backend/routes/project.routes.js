import express from 'express';
import * as projectController from '../controllers/project.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProject);

// Protected CMS routes
router.use(protect, requireRole(['Admin', 'Super Admin']));
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
