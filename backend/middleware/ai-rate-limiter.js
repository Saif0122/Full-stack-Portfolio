const userRequests = new Map();

// Limits: Max 50 requests per user per hour
const MAX_REQUESTS_PER_HOUR = 50;
const ONE_HOUR = 60 * 60 * 1000;

export const aiRateLimiter = (req, res, next) => {
  const userId = req.user?._id?.toString() || req.ip;
  const now = Date.now();

  if (!userRequests.has(userId)) {
    userRequests.set(userId, { count: 1, resetTime: now + ONE_HOUR });
    return next();
  }

  const record = userRequests.get(userId);

  // Reset if time passed
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + ONE_HOUR;
    return next();
  }

  // Enforce limit
  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    return res.status(429).json({
      success: false,
      message: 'AI request limit reached. Please try again later or contact an administrator to increase your quota.',
      retryAfter: new Date(record.resetTime)
    });
  }

  record.count += 1;
  next();
};
