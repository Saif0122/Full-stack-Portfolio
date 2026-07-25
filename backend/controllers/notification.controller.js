import { NotificationService } from '../services/notification.service.js';
import { notificationValidationSchema } from '../validators/notification.validator.js';

const notificationService = new NotificationService();

export const getNotifications = async (req, res, next) => {
  try {
    const data = await notificationService.getNotifications();
    const unreadCount = data.filter(n => !n.isRead).length;
    res.status(200).json({ success: true, data, unreadCount });
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const { error, value } = notificationValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const data = await notificationService.createNotification(value);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await notificationService.updateNotification(id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    await notificationService.markAllAsRead();
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    await notificationService.deleteNotification(id);
    res.status(200).json({ success: true, message: 'Notification dismissed' });
  } catch (error) {
    next(error);
  }
};
