import DashboardWidget from '../models/dashboard-widget.model.js';

export class DashboardWidgetRepository {
  async findAll(query = {}) {
    return await DashboardWidget.find(query).sort({ position: 1 });
  }

  async findByWidgetId(widgetId) {
    return await DashboardWidget.findOne({ widgetId });
  }

  async create(data) {
    return await DashboardWidget.create(data);
  }

  async update(widgetId, data) {
    return await DashboardWidget.findOneAndUpdate({ widgetId }, data, { new: true, upsert: true });
  }

  async delete(widgetId) {
    return await DashboardWidget.findOneAndDelete({ widgetId });
  }

  async updatePositions(widgetOrderList) {
    const promises = widgetOrderList.map((item, idx) => 
      DashboardWidget.findOneAndUpdate({ widgetId: item.widgetId }, { position: idx }, { new: true })
    );
    return await Promise.all(promises);
  }
}
