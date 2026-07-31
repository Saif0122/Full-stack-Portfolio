import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import postRoutes from './routes/post.routes.js';
import projectRoutes from './routes/project.routes.js';
import mediaRoutes from './routes/media.routes.js';
import settingRoutes from './routes/setting.routes.js';
import tagRoutes from './routes/tag.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';
import paymentsRoutes from './routes/payments.routes.js';
import downloadsRoutes from './routes/downloads.routes.js';
import invoicesRoutes from './routes/invoices.routes.js';
import licensesRoutes from './routes/licenses.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import aiRoutes from './routes/ai.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import seoRoutes from './routes/seo.routes.js';
import widgetRoutes from './routes/dashboard-widget.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import { config } from './config/env.config.js';

const app = express();

// Global Middleware
const allowedOrigins = config.allowedOrigins.split(',').map(url => url.trim());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or server-to-server)
    if (!origin) return callback(null, true);
    
    // Check if the origin is explicitly whitelisted
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // In development, be slightly more forgiving for localhost ports
    if (config.env !== 'production' && origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }

    return callback(new Error('CORS policy violation: Origin not allowed'), false);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running smoothly' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/downloads', downloadsRoutes);
app.use('/api/invoices', invoicesRoutes);
app.use('/api/licenses', licensesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/dashboard-widgets', widgetRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 Route Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Not Found - ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // In production, sanitize 500 Internal Server Error messages to prevent leakage
  let message = err.message;
  if (config.env === 'production' && statusCode >= 500) {
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    status: 'error',
    message: message,
    ...(config.env !== 'production' && { stack: err.stack }), // Only include stack property in dev
  });
});

export default app;
