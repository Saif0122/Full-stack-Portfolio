import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true, index: true }, // e.g., 'page_view', 'product_click', 'blog_read', 'download', 'search', 'conversion'
  targetId: { type: String }, // optional reference ID (post ID, product ID, download ID)
  path: { type: String }, // e.g., '/store/pro-tier', '/blog/ai-revolution'
  visitorId: { type: String, required: true }, // anonymous browser hash or user ID
  device: { type: String, default: 'desktop' }, // 'desktop', 'mobile', 'tablet'
  browser: { type: String },
  source: { type: String, default: 'direct' }, // referrer traffic source: 'google', 'twitter', 'github', 'direct'
  country: { type: String, default: 'Global' },
  duration: { type: Number, default: 0 }, // seconds spent on page/interaction
  metadata: { type: mongoose.Schema.Types.Mixed }, // additional custom analytics variables
}, { timestamps: true });

const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);
export default Analytics;
