const ApiKeyService = require("../services/ApiKeyService");
const TierService = require("../services/TierService");

const authenticate = async (req, res, next) => {
  try {
    const rawKey = req.headers["x-api-key"];
    if (!rawKey) {
      return res.status(401).json({
        error: "Missing API key. Include an X-API-Key header.",
        docs: "/docs",
      });
    }

    const apiKeyDoc = await ApiKeyService.authenticate(rawKey);
    if (!apiKeyDoc) {
      return res.status(401).json({ error: "Invalid or inactive API key." });
    }

    apiKeyDoc.resetDailyCountIfNeeded();

    if (!TierService.isWithinDailyLimit(apiKeyDoc)) {
      const tier = TierService.getTier(apiKeyDoc.tier);
      return res.status(429).json({
        error: `Daily limit of ${tier.dailyLimit} requests reached for the ${tier.label} tier.`,
        upgrade: "/pricing",
      });
    }

    if (!TierService.isMethodAllowed(apiKeyDoc.tier, req.method)) {
      const tier = TierService.getTier(apiKeyDoc.tier);
      return res.status(403).json({
        error: `The ${tier.label} tier does not allow ${req.method} requests.`,
        upgrade: "/pricing",
      });
    }

    apiKeyDoc.dailyRequestCount += 1;
    await apiKeyDoc.save();

    req.apiKeyDoc = apiKeyDoc;
    req.tier = TierService.getTier(apiKeyDoc.tier);
    next();
  } catch (err) {
    next(err);
  }
};

// Public read-only — no key required, GET only (used by the shrine-finder web app)
const publicRead = (req, res, next) => {
  if (req.method !== "GET") {
    return res.status(401).json({
      error: "Write operations require an API key.",
      docs: "/docs",
    });
  }
  next();
};

module.exports = { authenticate, publicRead };
