const ApiKeyService = require("../services/ApiKeyService");
const TierService = require("../services/TierService");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const rawKey = await ApiKeyService.register(email);
    const tier = TierService.getTier("free");

    res.status(201).json({
      message: "Free API key created. Save this key — it will not be shown again.",
      apiKey: rawKey,
      tier: "free",
      dailyLimit: tier.dailyLimit,
    });
  } catch (err) {
    next(err);
  }
};

const getKeyInfo = async (req, res, next) => {
  try {
    const rawKey = req.headers["x-api-key"];
    if (!rawKey) return res.status(401).json({ error: "Missing X-API-Key header." });

    const apiKeyDoc = await ApiKeyService.getInfoByRawKey(rawKey);
    if (!apiKeyDoc) return res.status(401).json({ error: "Invalid or inactive API key." });

    apiKeyDoc.resetDailyCountIfNeeded();

    res.json({
      email: apiKeyDoc.email,
      tier: apiKeyDoc.tier,
      dailyLimit: TierService.formatLimit(apiKeyDoc.tier),
      dailyRequestCount: apiKeyDoc.dailyRequestCount,
      remainingRequests: TierService.remainingRequests(apiKeyDoc),
      allowedMethods: TierService.getTier(apiKeyDoc.tier).allowedMethods,
      createdAt: apiKeyDoc.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, getKeyInfo };
