/**
 * Central environment configuration.
 * Import this instead of reading process.env directly throughout the app.
 * Validates required variables on startup so misconfiguration fails fast.
 */

const REQUIRED_IN_PRODUCTION = [
  "MONGODB_URI",
  "ALLOWED_ORIGINS",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_DEVELOPER_PRICE_ID",
  "STRIPE_PRO_PRICE_ID",
];

function validate() {
  if (process.env.NODE_ENV !== "production") return;

  const missing = REQUIRED_IN_PRODUCTION.filter((key) => !process.env[key]);
  if (missing.length) {
    console.error(
      `[startup] Missing required environment variables:\n  ${missing.join("\n  ")}\n` +
        `Copy shrine-database/.env.example to .env and fill in every value.`
    );
    process.exit(1);
  }
}

const env = {
  NODE_ENV:   process.env.NODE_ENV || "development",
  PORT:       Number(process.env.PORT) || 3000,

  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/shrines",

  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
    : ["http://localhost:5173", "http://localhost:5174"],

  STRIPE_SECRET_KEY:          process.env.STRIPE_SECRET_KEY || null,
  STRIPE_WEBHOOK_SECRET:      process.env.STRIPE_WEBHOOK_SECRET || null,
  STRIPE_DEVELOPER_PRICE_ID:  process.env.STRIPE_DEVELOPER_PRICE_ID || null,
  STRIPE_PRO_PRICE_ID:        process.env.STRIPE_PRO_PRICE_ID || null,
};

validate();

module.exports = env;
