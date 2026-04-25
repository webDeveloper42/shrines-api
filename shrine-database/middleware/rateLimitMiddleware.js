const rateLimit = require("express-rate-limit");

// Strict limiter for auth/registration endpoints (prevents key farming)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP. Please try again in 15 minutes.",
  },
});

// General API limiter (unauthenticated browsing)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Rate limit exceeded. Please slow down.",
  },
});

// Strict limiter for payment/upgrade endpoints
const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many payment requests. Please try again later.",
  },
});

module.exports = { authLimiter, apiLimiter, paymentLimiter };
