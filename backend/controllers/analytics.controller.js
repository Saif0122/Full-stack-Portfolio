import Product from '../models/product.model.js';
import Post from '../models/post.model.js';

export const getAnalyticsSummary = async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments();
    const postCount = await Post.countDocuments();
    
    // Mix dynamic DB counts with simulated executive telemetry metrics
    const data = {
      visitors: { total: 48291, growth: 14.2 },
      customers: { total: 1842, growth: 5 },
      orders: { total: 3410 },
      revenue: { total: 104820 },
      downloads: { total: 9420, topProduct: 'AI Studio Bundle' },
      products: { total: productCount, trend: `${productCount} Live` },
      blogs: { total: postCount, trend: `${postCount} Published` },
      projects: { total: 18, trend: '100% Synced' },
      seoScore: 98,
      systemHealth: '18ms Latency • MongoDB Clustered',
      recentActivity: [
        { time: 'Just now', user: 'Admin System', action: 'MongoDB Collection Resync', type: 'SYSTEM' },
        { time: '14 mins ago', user: 'AI Assistant Core (Gemini 3.1 Pro)', action: 'Generated 5 optimized JSON-LD structured data schemas for store.', type: 'AI' }
      ]
    };
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};
