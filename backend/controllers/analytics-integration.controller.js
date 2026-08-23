import { analyticsIntegrationService } from '../services/analytics-integration.service.js';
import { AnalyticsSnapshot } from '../models/analytics-snapshot.model.js';
import aiSeoService from '../services/ai-seo.service.js';

export const analyticsIntegrationController = {
  getDashboardData: async (req, res) => {
    try {
      const data = await analyticsIntegrationService.getDashboardData();
      res.json(data);
    } catch (error) {
      console.error('Error fetching analytics dashboard:', error);
      res.status(500).json({ error: 'Failed to fetch analytics dashboard data' });
    }
  },

  syncProviders: async (req, res) => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 1); // Sync last 24h by default

      await analyticsIntegrationService.syncAllProviders(startDate, endDate);
      res.json({ success: true, message: 'Synchronization triggered successfully' });
    } catch (error) {
      console.error('Error triggering sync:', error);
      res.status(500).json({ error: 'Failed to trigger synchronization' });
    }
  },
  
  getProviderSnapshots: async (req, res) => {
    try {
      const { providerId } = req.params;
      // Last 30 days
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      
      const snapshots = await AnalyticsSnapshot.find({ 
        providerId,
        date: { $gte: startDate }
      }).sort({ date: 1 });
      
      res.json(snapshots);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch snapshots for ${req.params.providerId}` });
    }
  },

  getAiRecommendations: async (req, res) => {
    try {
      // Get last 7 days of aggregated data
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      
      const snapshots = await analyticsIntegrationService.getAggregatedMetrics(startDate, endDate);
      const recommendations = await aiSeoService.generateAnalyticsRecommendations(snapshots, req.user?.id);
      
      res.json(recommendations);
    } catch (error) {
      console.error('Error generating AI analytics recommendations:', error);
      res.status(500).json({ error: 'Failed to generate AI recommendations' });
    }
  }
};
