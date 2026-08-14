import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  sessionId: { type: String, index: true },
  visitorId: { type: String, required: true, index: true }, // anonymous browser hash or user ID
  category: { type: String, enum: ['recruiter', 'website', 'marketplace', 'blog', 'ai', 'system'], default: 'website' },
  event: { type: String, required: true, index: true }, // e.g., 'page_view', 'product_click', 'blog_read', 'download', 'search', 'conversion', 'ai_interaction'
  action: { type: String }, // specific action inside event, e.g., 'resume_download'
  targetId: { type: String }, // optional reference ID (post ID, product ID, download ID)
  path: { type: String }, // e.g., '/store/pro-tier', '/blog/ai-revolution'
  device: { type: String, default: 'desktop' }, // 'desktop', 'mobile', 'tablet'
  browser: { type: String },
  source: { type: String, default: 'direct' }, // referrer traffic source: 'google', 'twitter', 'github', 'direct'
  country: { type: String, default: 'Global' },
  duration: { type: Number, default: 0 }, // seconds spent on page/interaction
  metadata: { type: mongoose.Schema.Types.Mixed }, // additional custom analytics variables
}, { timestamps: true });

const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

// Add compound indexes for frequent aggregation queries
analyticsSchema.index({ category: 1, event: 1 });
analyticsSchema.index({ category: 1, action: 1 });
analyticsSchema.index({ event: 1, path: 1 });

export default Analytics;
