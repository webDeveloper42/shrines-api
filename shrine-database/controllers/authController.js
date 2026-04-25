const ApiKey = require("../models/apiKey");
const { generateApiKey } = require("../config/authentication");
const TIERS = require("../config/tiers");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });

    const existing = await ApiKey.findOne({ email, tier: "free" });
    if (existing) {
      return res.status(409).json({
        error: "An API key for this email already exists.",
        tier: existing.tier,
      });
    }

    const key = generateApiKey();
    const apiKeyDoc = await ApiKey.create({ key, email, tier: "free" });

    res.status(201).json({
      message: "Free API key created. Keep this key safe — it won't be shown again.",
      apiKey: apiKeyDoc.key,
      tier: apiKeyDoc.tier,
      dailyLimit: TIERS.free.dailyLimit,
    });
  } catch (err) {
    next(err);
  }
};

const getKeyInfo = async (req, res, next) => {
  try {
    const key = req.headers["x-api-key"];
    if (!key) return res.status(401).json({ error: "Missing X-API-Key header." });

    const apiKeyDoc = await ApiKey.findOne({ key, active: true });
    if (!apiKeyDoc) return res.status(401).json({ error: "Invalid or inactive API key." });

    apiKeyDoc.resetDailyCountIfNeeded();
    const tier = TIERS[apiKeyDoc.tier];

    res.json({
      email: apiKeyDoc.email,
      tier: apiKeyDoc.tier,
      dailyLimit: tier.dailyLimit === Infinity ? "Unlimited" : tier.dailyLimit,
      dailyRequestCount: apiKeyDoc.dailyRequestCount,
      remainingRequests:
        tier.dailyLimit === Infinity
          ? "Unlimited"
          : tier.dailyLimit - apiKeyDoc.dailyRequestCount,
      allowedMethods: tier.allowedMethods,
      createdAt: apiKeyDoc.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, getKeyInfo };
