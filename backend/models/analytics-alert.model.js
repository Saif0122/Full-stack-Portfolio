import mongoose from 'mongoose';

const analyticsAlertSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['traffic_drop', 'indexing_failure', 'ctr_drop', 'ranking_drop', 'vitals_regression', 'api_failure', 'sync_error']
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  providerId: {
    type: String,
    index: true // Optional, if alert is specific to a provider
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'ignored'],
    default: 'active',
    index: true
  },
  data: {
    // Contextual data (e.g., previous traffic vs current traffic)
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

export const AnalyticsAlert = mongoose.models.AnalyticsAlert || mongoose.model('AnalyticsAlert', analyticsAlertSchema);
