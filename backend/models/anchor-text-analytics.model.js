import mongoose from 'mongoose';

const anchorTextAnalyticsSchema = new mongoose.Schema({
  // Exact phrase used in anchor text
  phrase: { type: String, required: true, index: true },
  
  // Categorization
  anchorType: { 
    type: String, 
    enum: ['Primary', 'Secondary', 'Keyword', 'Branded', 'Generic', 'Empty', 'Image'],
    required: true
  },
  
  // Total times this phrase is used across the entire site
  globalUsageCount: { type: Number, default: 0 },
  
  // Is this phrase competing against itself for multiple different target URIs? (Cannibalization)
  isCannibalizing: { type: Boolean, default: false },
  
  // List of unique target URIs this anchor text points to
  targetUris: [{ type: String }]

}, { timestamps: true });

const AnchorTextAnalytics = mongoose.models.AnchorTextAnalytics || mongoose.model('AnchorTextAnalytics', anchorTextAnalyticsSchema);
export default AnchorTextAnalytics;
