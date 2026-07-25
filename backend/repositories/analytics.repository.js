import Analytics from '../models/analytics.model.js';

export class AnalyticsRepository {
  async findAll(query = {}, options = { sort: { createdAt: -1 }, limit: 500 }) {
    return await Analytics.find(query).sort(options.sort).limit(options.limit);
  }

  async findById(id) {
    return await Analytics.findById(id);
  }

  async create(data) {
    return await Analytics.create(data);
  }

  async delete(id) {
    return await Analytics.findByIdAndDelete(id);
  }

  async aggregateEvents(pipeline) {
    return await Analytics.aggregate(pipeline);
  }
}
