require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
require("./config/database");

const { apiLimiter } = require("./middleware/rateLimitMiddleware");
const { errorHandler, notFoundHandler } = require("./middleware/errorMiddleware");
const shrineRoutes = require("./controllers/routes/shrineRoutes");
const authRoutes = require("./controllers/routes/authRoutes");
const paymentRoutes = require("./controllers/routes/paymentRoutes");

const app = express();
const { PORT = 3000, ALLOWED_ORIGINS = "" } = process.env;

// ── Allowed origins ─────────────────────────────────────────
const allowedOrigins = ALLOWED_ORIGINS
  ? ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:5174"];

// ── Security headers (helmet) ───────────────────────────────
app.use(helmet());

// ── CORS (strict allowlist, never wildcard) ─────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "X-API-Key"],
  })
);

// ── Raw body for Stripe webhook (before json middleware) ─────
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// ── Body parsing with size limits ───────────────────────────
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

// ── NoSQL injection prevention ───────────────────────────────
app.use(mongoSanitize());

// ── Routes ──────────────────────────────────────────────────
app.use("/api/shrines", apiLimiter, shrineRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// ── 404 ─────────────────────────────────────────────────────
app.use(notFoundHandler);

// ── Global error handler ─────────────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Shrine Database API running on port ${PORT}`);
});

module.exports = app;
