const TIERS = require("../config/tiers");

class TierService {
  static getTier(tierName) {
    const tier = TIERS[tierName];
    if (!tier) {
      const err = new Error(`Unknown tier: ${tierName}`);
      err.statusCode = 500;
      throw err;
    }
    return tier;
  }

  static isMethodAllowed(tierName, method) {
    const tier = TierService.getTier(tierName);
    return tier.allowedMethods.includes(method);
  }

  static isWithinDailyLimit(apiKeyDoc) {
    const tier = TierService.getTier(apiKeyDoc.tier);
    if (tier.dailyLimit === Infinity) return true;
    return apiKeyDoc.dailyRequestCount < tier.dailyLimit;
  }

  static formatLimit(tierName) {
    const tier = TierService.getTier(tierName);
    return tier.dailyLimit === Infinity ? "Unlimited" : tier.dailyLimit.toLocaleString();
  }

  static remainingRequests(apiKeyDoc) {
    const tier = TierService.getTier(apiKeyDoc.tier);
    if (tier.dailyLimit === Infinity) return "Unlimited";
    return Math.max(0, tier.dailyLimit - apiKeyDoc.dailyRequestCount);
  }
}

module.exports = TierService;
