import Notification from '../models/notification.model.js';

export class NotificationRepository {
  async findAll(query = {}, limit = 100) {
    return await Notification.find(query).sort({ createdAt: -1 }).limit(limit);
  }

  async findById(id) {
    return await Notification.findById(id);
  }

  async create(data) {
    return await Notification.create(data);
  }

  async update(id, data) {
    return await Notification.findByIdAndUpdate(id, data, { new: true });
  }

  async markAllAsRead(recipientRole = 'Admin') {
    return await Notification.updateMany({ recipientRole, isRead: false }, { isRead: true });
  }

  async delete(id) {
    return await Notification.findByIdAndDelete(id);
  }
}
