import { AnalyticsProvider } from '../models/analytics-provider.model.js';
import { AnalyticsSnapshot } from '../models/analytics-snapshot.model.js';
import { AnalyticsAlert } from '../models/analytics-alert.model.js';
import { SearchConsoleProvider } from './analytics/providers/search-console.provider.js';
import { Ga4Provider } from './analytics/providers/ga4.provider.js';
import { BingWebmasterProvider } from './analytics/providers/bing.provider.js';
import { ClarityProvider } from './analytics/providers/clarity.provider.js';

class AnalyticsIntegrationService {
  constructor() {
    this.providers = {
      gsc: new SearchConsoleProvider(),
      ga4: new Ga4Provider(),
      bing: new BingWebmasterProvider(),
      clarity: new ClarityProvider()
    };
  }

  /**
   * Initializes connections for all active providers in the database.
   */
  async initializeProviders() {
    const activeProviders = await AnalyticsProvider.find({ status: 'connected' });
    for (const provider of activeProviders) {
      if (this.providers[provider.providerId]) {
        try {
          await this.providers[provider.providerId].connect(provider.credentials);
        } catch (error) {
          console.error(`Failed to connect to ${provider.providerId}:`, error);
        }
      }
    }
  }

  /**
   * Synchronizes metrics for all connected providers. Can run on a cron job (e.g., midnight).
   * @param {Date} startDate 
   * @param {Date} endDate 
   */
  async syncAllProviders(startDate, endDate) {
    const connectedProviders = Object.keys(this.providers).filter(async (id) => {
        return await this.providers[id].testConnection();
    });

    for (const providerId of connectedProviders) {
      try {
        const snapshots = await this.providers[providerId].syncMetrics(startDate, endDate);
        
        if (snapshots && snapshots.length > 0) {
          // Bulk insert snapshots
          await AnalyticsSnapshot.insertMany(snapshots);
          
          // Update last sync time
          await AnalyticsProvider.findOneAndUpdate(
            { providerId }, 
            { lastSyncAt: new Date(), status: 'connected' }
          );
        }
      } catch (error) {
        console.error(`Sync failed for ${providerId}:`, error);
        
        await AnalyticsAlert.create({
          type: 'sync_error',
          severity: 'high',
          providerId,
          message: `Background synchronization failed for ${providerId}: ${error.message}`
        });

        await AnalyticsProvider.findOneAndUpdate(
          { providerId }, 
          { status: 'error', errorMessage: error.message }
        );
      }
    }
  }

  /**
   * Aggregates snapshots for a specific date range across all providers.
   */
  async getAggregatedMetrics(startDate, endDate) {
    // Note: In a real app this would use MongoDB aggregation pipelines.
    // We fetch snapshots within range for UI presentation.
    return await AnalyticsSnapshot.find({
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });
  }

  /**
   * Generates mock data for unconfigured providers during development to show UI
   */
  async getDashboardData() {
    // Generate a quick summary across mock providers for the dashboard
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    // Connect locally for UI demo
    await this.providers.gsc.connect({});
    await this.providers.ga4.connect({});
    
    const gscData = await this.providers.gsc.syncMetrics(lastWeek, today);
    const ga4Data = await this.providers.ga4.syncMetrics(lastWeek, today);
    
    return {
      gsc: gscData,
      ga4: ga4Data,
      overallHealth: 94
    };
  }
}

export const analyticsIntegrationService = new AnalyticsIntegrationService();
