const ApiKey = require("../models/apiKey");
const TIERS = require("../config/tiers");

// Full API-key authentication — used by developer-facing routes
const authenticate = async (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key) {
    return res.status(401).json({
      error: "Missing API key. Include X-API-Key header.",
      docs: "https://shrine-database.dev/docs",
    });
  }

  const apiKeyDoc = await ApiKey.findOne({ key, active: true }).catch(next);
  if (!apiKeyDoc) {
    return res.status(401).json({ error: "Invalid or inactive API key." });
  }

  apiKeyDoc.resetDailyCountIfNeeded();

  const tier = TIERS[apiKeyDoc.tier];

  if (
    tier.dailyLimit !== Infinity &&
    apiKeyDoc.dailyRequestCount >= tier.dailyLimit
  ) {
    return res.status(429).json({
      error: `Daily request limit of ${tier.dailyLimit} reached for the ${tier.label} tier.`,
      upgrade: "https://shrine-database.dev/pricing",
    });
  }

  if (!tier.allowedMethods.includes(req.method)) {
    return res.status(403).json({
      error: `The ${tier.label} tier does not allow ${req.method} requests.`,
      upgrade: "https://shrine-database.dev/pricing",
    });
  }

  if (apiKeyDoc.tier === "free" && req.params.id) {
    return res.status(403).json({
      error: "The Free tier does not allow individual shrine lookups.",
      upgrade: "https://shrine-database.dev/pricing",
    });
  }

  apiKeyDoc.dailyRequestCount += 1;
  await apiKeyDoc.save().catch(next);

  req.apiKeyDoc = apiKeyDoc;
  req.tier = tier;
  next();
};

// Public read-only access — used by the shrine-finder web app itself (no key required)
// Only allows GET requests, no individual lookups for unauthenticated callers
const publicRead = (req, res, next) => {
  if (req.method !== "GET") {
    return res.status(401).json({
      error: "Write operations require an API key.",
      docs: "https://shrine-database.dev/docs",
    });
  }
  next();
};

module.exports = { authenticate, publicRead };
