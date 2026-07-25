import express from 'express';
import * as notificationController from '../controllers/notification.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect, requireRole(['Admin', 'Super Admin']));

router.get('/', notificationController.getNotifications);
router.post('/', notificationController.createNotification);
router.put('/mark-all-read', notificationController.markAllAsRead);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

export default router;
