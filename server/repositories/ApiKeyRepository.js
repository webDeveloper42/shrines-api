const ApiKey = require("../models/apiKey");

class ApiKeyRepository {
  static async findByKeyHash(keyHash) {
    return ApiKey.findOne({ keyHash, active: true });
  }

  static async findByEmail(email) {
    return ApiKey.findOne({ email: email.toLowerCase(), active: true });
  }

  static async findBySubscriptionId(subscriptionId) {
    return ApiKey.findOne({ stripeSubscriptionId: subscriptionId });
  }

  static async create(data) {
    return ApiKey.create(data);
  }

  static async updateByKeyHash(keyHash, data) {
    return ApiKey.findOneAndUpdate({ keyHash }, data, { new: true });
  }

  static async updateBySubscriptionId(subscriptionId, data) {
    return ApiKey.findOneAndUpdate({ stripeSubscriptionId: subscriptionId }, data, {
      new: true,
    });
  }
}

module.exports = ApiKeyRepository;
