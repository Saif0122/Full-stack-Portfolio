import { NotificationRepository } from '../repositories/notification.repository.js';

const notificationRepo = new NotificationRepository();

export class NotificationService {
  async getNotifications(query = {}, limit = 50) {
    let notifications = await notificationRepo.findAll(query, limit);
    
    // Seed high-fidelity system alerts if none exist
    if (!notifications || notifications.length === 0) {
      const initialAlerts = [
        { title: 'Enterprise Core Initialized', message: 'Phase 11 Admin Platform fully integrated with Clean Architecture & Mongoose Sync.', type: 'system', severity: 'low', targetUrl: '/admin/dashboard', isRead: false },
        { title: 'New AI Workflow Generation', message: 'Gemini Pro 3.1 completed high-speed code assistant model indexing.', type: 'ai', severity: 'medium', targetUrl: '/admin/dashboard/ai', isRead: false },
        { title: 'SEO Health Milestone Check', message: 'Sitemap crawler verified 100% canonical tags with zero broken references.', type: 'success', severity: 'low', targetUrl: '/admin/dashboard/seo', isRead: true },
        { title: 'Spike in Organic Store Traffic', message: 'Store visitor volume increased by 28.4% over past 24 hours via Google referrers.', type: 'info', severity: 'medium', targetUrl: '/admin/dashboard/analytics', isRead: false }
      ];

      for (const alert of initialAlerts) {
        await notificationRepo.create(alert);
      }
      notifications = await notificationRepo.findAll(query, limit);
    }
    return notifications;
  }

  async createNotification(data) {
    return await notificationRepo.create(data);
  }

  async updateNotification(id, data) {
    return await notificationRepo.update(id, data);
  }

  async markAllAsRead() {
    return await notificationRepo.markAllAsRead();
  }

  async deleteNotification(id) {
    return await notificationRepo.delete(id);
  }
}
