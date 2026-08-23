import mongoose from 'mongoose';

const analyticsSnapshotSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  metrics: {
    // e.g. { impressions: 500, clicks: 12, users: 100 }
    type: Map,
    of: Number,
    default: {}
  },
  dimensions: {
    // e.g. { query: 'nextjs saas', device: 'desktop' }
    type: Map,
    of: String,
    default: {}
  },
  url: {
    // Optional, if the snapshot is URL-specific
    type: String,
    index: true
  }
}, { timestamps: true });

// Compound index for time-series querying
analyticsSnapshotSchema.index({ providerId: 1, date: -1 });
analyticsSnapshotSchema.index({ url: 1, date: -1 });

export const AnalyticsSnapshot = mongoose.models.AnalyticsSnapshot || mongoose.model('AnalyticsSnapshot', analyticsSnapshotSchema);
