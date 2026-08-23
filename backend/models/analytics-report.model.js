import mongoose from 'mongoose';

const analyticsReportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  data: {
    // Aggregated report data
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  downloadUrl: {
    type: String // URL to generated PDF/CSV if stored externally
  },
  status: {
    type: String,
    enum: ['generating', 'ready', 'failed'],
    default: 'ready'
  }
}, { timestamps: true });

export const AnalyticsReport = mongoose.models.AnalyticsReport || mongoose.model('AnalyticsReport', analyticsReportSchema);
