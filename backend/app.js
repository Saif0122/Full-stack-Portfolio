import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import passport from './config/passport.config.js';
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
import aiProductSeoRoutes from './routes/ai-product-seo.routes.js';
import aiApprovalRoutes from './routes/ai-approval.routes.js';
import aiSettingsRoutes from './routes/ai-settings.routes.js';
import marketplaceSeoRoutes from './routes/marketplace-seo.routes.js';
import productsRoutes from './routes/products.routes.js';
import widgetRoutes from './routes/dashboard-widget.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import messageRoutes from './routes/message.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';
import usersRoutes from './routes/users.routes.js';
import commentRoutes from './routes/comment.routes.js';
import healthRoutes from './routes/health.routes.js';
import exportRoutes from './routes/export.routes.js';
import redirectRoutes from './routes/redirect.routes.js';
import schemaConfigRoutes from './routes/schema-config.routes.js';
import schemaRoutes from './routes/schema.routes.js';
import localSeoRoutes from './routes/local-seo.routes.js';
import mediaSeoRoutes from './routes/media-seo.routes.js';
import internalLinkingRoutes from './routes/internal-linking.routes.js';
import analyticsIntegrationRoutes from './routes/analytics-integration.routes.js';
import { config } from './config/env.config.js';
import helmet from 'helmet';
import { generateCsrfToken, verifyCsrfToken } from './middleware/csrf.middleware.js';

const app = express();
app.use(helmet());

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 0.1,
  profilesSampleRate: 0.1,
});

Sentry.setupExpressErrorHandler(app);

// Global Middleware
const allowedOrigins = config.allowedOrigins.split(',').map(url => url.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (config.env !== 'production' && origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy violation: Origin not allowed'), false);
  },
  credentials: true
}));
app.use(express.json({
  verify: (req, res, buf) => {
    // Required for Stripe webhook signature validation
    if (req.originalUrl.startsWith('/api/checkout/webhook') || req.originalUrl.startsWith('/api/payments/webhook')) {
      req.rawBody = buf;
    }
  }
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(generateCsrfToken);
app.use(verifyCsrfToken);
app.use(passport.initialize());




// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/export', exportRoutes);
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
app.use('/api/marketplace-seo', marketplaceSeoRoutes);
app.use('/api/ai-product-seo', aiProductSeoRoutes);
app.use('/api/ai-approval', aiApprovalRoutes);
app.use('/api/ai-settings', aiSettingsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/dashboard-widgets', widgetRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/newsletters', newsletterRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/redirects', redirectRoutes);
app.use('/api/schema-config', schemaConfigRoutes);
app.use('/api/schema', schemaRoutes);
app.use('/api/local-seo', localSeoRoutes);
app.use('/api/media-seo', mediaSeoRoutes);
app.use('/api/internal-linking', internalLinkingRoutes);
app.use('/api/analytics-integration', analyticsIntegrationRoutes);

// 404 Route Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Not Found - ${req.originalUrl}`
  });
});

// Sentry Error Handler
// Optional: app.use(Sentry.expressErrorHandler()); if setupExpressErrorHandler is not used, but setupExpressErrorHandler handles it.

import logger from './utils/logger.js';

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  logger.error(`[${req.method}] ${req.originalUrl} >> StatusCode: ${res.statusCode}, Message: ${err.message}`, { stack: err.stack });
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
