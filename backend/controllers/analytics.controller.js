import Product from '../models/product.model.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import Analytics from '../models/analytics.model.js';
import Download from '../models/download.model.js';
import Project from '../models/project.model.js';
import Notification from '../models/notification.model.js';
import Session from '../models/session.model.js';
import NodeCache from 'node-cache';

const analyticsCache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

export const getAnalyticsSummary = async (req, res, next) => {
  try {
    const cacheKey = 'analytics_summary';
    const cachedData = analyticsCache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({ success: true, data: cachedData, cached: true });
    }
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
      seoScore: '[Demo] 98',
      systemHealth: '[Demo] 18ms Latency • MongoDB Clustered',
      recentActivity: recentActivity.length > 0 ? recentActivity : [
        { time: 'Just now', user: 'Admin System', action: 'System initialized.', type: 'SYSTEM' }
      ]
    };
    
    analyticsCache.set(cacheKey, data);
    
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

export const trackEvent = async (req, res, next) => {
  try {
    const { sessionId, visitorId, category, event, action, targetId, path, device, browser, source, country, duration, metadata } = req.body;
    
    // Create new event
    const newEvent = new Analytics({
      sessionId,
      visitorId,
      category,
      event,
      action,
      targetId,
      path,
      device,
      browser,
      source,
      country,
      duration,
      metadata
    });
    
    await newEvent.save();

    // If it's a page_view, ensure session exists
    if (event === 'page_view' && sessionId) {
      try {
        const existingSession = await Session.findOne({ sessionId });
        if (!existingSession) {
          const ipHash = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
          await Session.create({
            sessionId,
            visitorId,
            ipHash,
            device,
            browser,
            country,
            landingPage: path,
            referrer: source
          });
        }
      } catch (err) {
        console.error('Session tracking error:', err);
      }
    }

    res.status(200).json({ success: true, message: 'Event tracked' });
  } catch (error) {
    // Fail silently for analytics ingestion to avoid blocking client
    console.error('Analytics tracking error:', error);
    res.status(200).json({ success: false, message: 'Tracking failed but acknowledged' });
  }
};

export const endSession = async (req, res, next) => {
  try {
    const { sessionId, exitPage, duration } = req.body;
    
    if (sessionId) {
      try {
        await Session.findOneAndUpdate(
          { sessionId },
          { 
            exitPage, 
            duration, 
            endedAt: new Date() 
          }
        );
      } catch (err) {
        console.error('Session end error:', err);
      }
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ success: false });
  }
};

export const getRecruiterAnalytics = async (req, res, next) => {
  try {
    const resumeDownloads = await Analytics.countDocuments({ category: 'recruiter', action: 'resume_download' });
    const resumePreviews = await Analytics.countDocuments({ category: 'recruiter', action: 'resume_preview' });
    const githubClicks = await Analytics.countDocuments({ category: 'recruiter', action: 'github_click' });
    const linkedinClicks = await Analytics.countDocuments({ category: 'recruiter', action: 'linkedin_click' });
    const emailClicks = await Analytics.countDocuments({ category: 'recruiter', action: 'email_click' });

    // Most viewed projects
    const topProjects = await Analytics.aggregate([
      { $match: { category: 'website', event: 'page_view', path: { $regex: /^\/projects\// } } },
      { $group: { _id: '$path', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        resumeDownloads,
        resumePreviews,
        githubClicks,
        linkedinClicks,
        emailClicks,
        topProjects
      }
    });
  } catch (error) { next(error); }
};

export const getWebsiteAnalytics = async (req, res, next) => {
  try {
    const totalVisitors = await Session.countDocuments();
    const uniqueVisitors = (await Session.distinct('visitorId')).length;
    
    const averageSessionDurationResult = await Session.aggregate([
      { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
    ]);
    const avgSessionDuration = averageSessionDurationResult.length ? averageSessionDurationResult[0].avgDuration : 0;

    const deviceStats = await Session.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } }
    ]);
    
    const osStats = await Session.aggregate([
      { $group: { _id: '$os', count: { $sum: 1 } } }
    ]);
    
    const trafficSources = await Session.aggregate([
      { $group: { _id: '$referrer', count: { $sum: 1 } } }
    ]);

    const topPages = await Analytics.aggregate([
      { $match: { event: 'page_view' } },
      { $group: { _id: '$path', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        uniqueVisitors,
        avgSessionDuration,
        deviceStats,
        osStats,
        trafficSources,
        topPages
      }
    });
  } catch (error) { next(error); }
};

export const getAiAnalytics = async (req, res, next) => {
  try {
    const totalInteractions = await Analytics.countDocuments({ category: 'ai' });
    const aiSessions = (await Analytics.distinct('sessionId', { category: 'ai' })).length;
    
    const topQuestions = await Analytics.aggregate([
      { $match: { category: 'ai', event: 'ai_interaction' } },
      { $group: { _id: '$action', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalInteractions,
        aiSessions,
        topQuestions,
        avgResponseTime: '[Demo] 420',
        userSatisfaction: '[Demo] 94'
      }
    });
  } catch (error) { next(error); }
};

export const getMarketplaceAnalytics = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments({ status: 'completed' });
    const totalRefunds = await Order.countDocuments({ status: 'refunded' });
    
    const revenueResult = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' }, avgOrderValue: { $avg: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length ? revenueResult[0].totalRevenue : 0;
    const avgOrderValue = revenueResult.length ? revenueResult[0].avgOrderValue : 0;

    const topProducts = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product', sold: { $sum: '$items.quantity' } } },
      { $sort: { sold: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'productDetails' } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalRefunds,
        totalRevenue,
        avgOrderValue,
        topProducts: topProducts.map(p => ({
          name: p.productDetails[0]?.name || 'Unknown',
          sold: p.sold
        }))
      }
    });
  } catch (error) { next(error); }
};

export const getBlogAnalytics = async (req, res, next) => {
  try {
    const totalViews = await Analytics.countDocuments({ category: 'blog', event: 'page_view' });
    const uniqueReaders = (await Analytics.distinct('visitorId', { category: 'blog', event: 'page_view' })).length;
    
    const topArticles = await Analytics.aggregate([
      { $match: { category: 'blog', event: 'page_view' } },
      { $group: { _id: '$path', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 5 }
    ]);

    const engagementActions = await Analytics.aggregate([
      { $match: { category: 'blog', event: { $in: ['like', 'share', 'bookmark', 'comment'] } } },
      { $group: { _id: '$event', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalViews,
        uniqueReaders,
        topArticles,
        engagementActions: engagementActions.reduce((acc, curr) => ({...acc, [curr._id]: curr.count}), {})
      }
    });
  } catch (error) { next(error); }
};

