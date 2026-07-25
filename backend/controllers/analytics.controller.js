import { AnalyticsService } from '../services/analytics.service.js';
import { analyticsValidationSchema } from '../validators/analytics.validator.js';

const analyticsService = new AnalyticsService();

export const logEvent = async (req, res, next) => {
  try {
    const { error, value } = analyticsValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const data = await analyticsService.logEvent(value);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getSummaryMetrics = async (req, res, next) => {
  try {
    const timeRange = req.query.range || '7d';
    const metrics = await analyticsService.getSummaryMetrics(timeRange);
    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const query = req.query || {};
    const data = await analyticsService.getAllEvents(query);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
