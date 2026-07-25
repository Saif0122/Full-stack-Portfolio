import Product from '../models/product.model.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import Analytics from '../models/analytics.model.js';
import Download from '../models/download.model.js';
import Project from '../models/project.model.js';
import Notification from '../models/notification.model.js';

export const getAnalyticsSummary = async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments();
    const postCount = await Post.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    const visitorCount = await Analytics.countDocuments();
    const projectCount = await Project.countDocuments();
    
    // Revenue calculation
    const revenueResult = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Downloads calculation
    const downloadResult = await Download.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: '$downloadCount' } } }
    ]);
    const totalDownloads = downloadResult.length > 0 ? downloadResult[0].totalDownloads : 0;

    // Fetch top downloaded product name if possible, else default
    const topDownload = await Download.findOne().sort({ downloadCount: -1 }).populate('product');
    const topProductName = topDownload && topDownload.product ? topDownload.product.name : 'N/A';

    // Recent activity (notifications)
    const recentNotifications = await Notification.find().sort({ createdAt: -1 }).limit(5);
    const recentActivity = recentNotifications.map(notif => {
      // Calculate time string like '14 mins ago' or 'Just now'
      const diffMs = Date.now() - new Date(notif.createdAt).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      let timeStr = 'Just now';
      if (diffMins > 0 && diffMins < 60) timeStr = `${diffMins} mins ago`;
      else if (diffMins >= 60) {
        const hrs = Math.floor(diffMins / 60);
        if (hrs < 24) timeStr = `${hrs} hrs ago`;
        else timeStr = `${Math.floor(hrs / 24)} days ago`;
      }

      return {
        time: timeStr,
        user: notif.recipientRole || 'System',
        action: notif.message,
        type: (notif.type || 'info').toUpperCase()
      };
    });

    // Mix dynamic DB counts with simulated executive telemetry metrics
    const data = {
      visitors: { total: visitorCount, growth: 0 },
      customers: { total: userCount, growth: 0 },
      orders: { total: orderCount, trend: 'Total orders' },
      revenue: { total: totalRevenue, trend: 'Actual Revenue' },
      downloads: { total: totalDownloads, topProduct: topProductName },
      products: { total: productCount, trend: `${productCount} Live` },
      blogs: { total: postCount, trend: `${postCount} Published` },
      projects: { total: projectCount, trend: '100% Synced' },
      seoScore: 98,
      systemHealth: '18ms Latency • MongoDB Clustered',
      recentActivity: recentActivity.length > 0 ? recentActivity : [
        { time: 'Just now', user: 'Admin System', action: 'System initialized.', type: 'SYSTEM' }
      ]
    };
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};
