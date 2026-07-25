import { DashboardWidgetService } from '../services/dashboard-widget.service.js';
import { dashboardWidgetValidationSchema } from '../validators/dashboard-widget.validator.js';

const widgetService = new DashboardWidgetService();

export const getAllWidgets = async (req, res, next) => {
  try {
    const data = await widgetService.getAllWidgets();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateWidget = async (req, res, next) => {
  try {
    const { widgetId } = req.params;
    const { error, value } = dashboardWidgetValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const data = await widgetService.updateWidget(widgetId, value);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const reorderWidgets = async (req, res, next) => {
  try {
    const { widgets } = req.body; // array of { widgetId, position }
    if (!Array.isArray(widgets)) {
      return res.status(400).json({ success: false, message: 'Expected widgets array for reordering' });
    }
    const data = await widgetService.reorderWidgets(widgets);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteWidget = async (req, res, next) => {
  try {
    const { widgetId } = req.params;
    await widgetService.deleteWidget(widgetId);
    res.status(200).json({ success: true, message: 'Widget removed from layout' });
  } catch (error) {
    next(error);
  }
};
