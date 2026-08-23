import mongoose from 'mongoose';

const analyticsProviderSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
    unique: true,
    enum: ['gsc', 'ga4', 'bing', 'clarity', 'ahrefs', 'semrush', 'moz']
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['connected', 'disconnected', 'error', 'pending'],
    default: 'disconnected'
  },
  credentials: {
    // Stored encrypted or refer to secret manager in production
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  config: {
    // Provider specific config (e.g. domain, view ID)
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  lastSyncAt: {
    type: Date
  },
  quotaUsage: {
    requestsToday: { type: Number, default: 0 },
    limit: { type: Number, default: 1000 },
    resetAt: { type: Date }
  },
  errorMessage: {
    type: String
  }
}, { timestamps: true });

export const AnalyticsProvider = mongoose.models.AnalyticsProvider || mongoose.model('AnalyticsProvider', analyticsProviderSchema);
