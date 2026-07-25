import express from 'express';
import * as widgetController from '../controllers/dashboard-widget.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// All widget layout commands require Executive Admin authorization
router.use(protect, requireRole(['Admin', 'Super Admin']));

router.get('/', widgetController.getAllWidgets);
router.put('/reorder', widgetController.reorderWidgets);
router.put('/:widgetId', widgetController.updateWidget);
router.delete('/:widgetId', widgetController.deleteWidget);

export default router;
