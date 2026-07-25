import { DashboardWidgetRepository } from '../repositories/dashboard-widget.repository.js';

const widgetRepo = new DashboardWidgetRepository();

export class DashboardWidgetService {
  async getAllWidgets() {
    let widgets = await widgetRepo.findAll();
    
    // Automatically seed the 12 requested Executive Dashboard Widgets if none exist
    if (!widgets || widgets.length === 0) {
      const defaultWidgets = [
        { widgetId: 'visitors', title: 'Visitors & Traffic', category: 'analytics', metricType: 'counter_trend', position: 0, width: '1/4', isVisible: true, config: { target: 50000, color: 'indigo' } },
        { widgetId: 'customers', title: 'Total Customers', category: 'commerce', metricType: 'counter_trend', position: 1, width: '1/4', isVisible: true, config: { target: 2000, color: 'emerald' } },
        { widgetId: 'orders', title: 'Processed Orders', category: 'commerce', metricType: 'counter_trend', position: 2, width: '1/4', isVisible: true, config: { target: 3500, color: 'cyan' } },
        { widgetId: 'revenue', title: 'Projected Revenue (Future)', category: 'commerce', metricType: 'counter_trend', position: 3, width: '1/4', isVisible: true, config: { target: 100000, color: 'amber', prefix: '$' } },
        { widgetId: 'downloads', title: 'Asset Downloads', category: 'commerce', metricType: 'gauge', position: 4, width: '1/3', isVisible: true, config: { max: 10000, current: 9420 } },
        { widgetId: 'products', title: 'Active Products', category: 'commerce', metricType: 'list_stat', position: 5, width: '1/3', isVisible: true, config: { total: 24, featured: 6 } },
        { widgetId: 'published_blogs', title: 'Published Blog Articles', category: 'content', metricType: 'list_stat', position: 6, width: '1/3', isVisible: true, config: { total: 42, drafts: 3 } },
        { widgetId: 'projects', title: 'Showcased Projects', category: 'content', metricType: 'counter_trend', position: 7, width: '1/3', isVisible: true, config: { total: 18, repositories: 26 } },
        { widgetId: 'seo_score', title: 'SEO Health Score', category: 'analytics', metricType: 'gauge', position: 8, width: '1/3', isVisible: true, config: { max: 100, current: 98, status: 'Optimal' } },
        { widgetId: 'system_health', title: 'System Health & Latency', category: 'system', metricType: 'status_monitor', position: 9, width: '1/3', isVisible: true, config: { latency: '18ms', uptime: '99.99%', database: 'Sync Online' } },
        { widgetId: 'recent_activity', title: 'Recent Platform Activity', category: 'system', metricType: 'activity_stream', position: 10, width: '1/2', isVisible: true, config: { limit: 5 } },
        { widgetId: 'quick_actions', title: 'Executive Quick Actions', category: 'system', metricType: 'command_grid', position: 11, width: '1/2', isVisible: true, config: {} }
      ];

      for (const w of defaultWidgets) {
        await widgetRepo.update(w.widgetId, w);
      }
      widgets = await widgetRepo.findAll();
    }
    return widgets;
  }

  async updateWidget(widgetId, data) {
    return await widgetRepo.update(widgetId, data);
  }

  async reorderWidgets(widgetOrders) {
    return await widgetRepo.updatePositions(widgetOrders);
  }

  async deleteWidget(widgetId) {
    return await widgetRepo.delete(widgetId);
  }
}
