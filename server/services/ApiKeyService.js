const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const ApiKeyRepository = require("../repositories/ApiKeyRepository");

class ApiKeyService {
  static generateRawKey() {
    return `shrines_${uuidv4().replace(/-/g, "")}`;
  }

  static hashKey(rawKey) {
    return crypto.createHash("sha256").update(rawKey).digest("hex");
  }

  static async register(email) {
    const existing = await ApiKeyRepository.findByEmail(email);
    if (existing) {
      const err = new Error("An API key for this email already exists.");
      err.statusCode = 409;
      throw err;
    }

    const rawKey = ApiKeyService.generateRawKey();
    const keyHash = ApiKeyService.hashKey(rawKey);
    await ApiKeyRepository.create({ keyHash, email: email.toLowerCase(), tier: "free" });

    return rawKey; // returned exactly once — never persisted in plaintext
  }

  static async authenticate(rawKey) {
    if (!rawKey || typeof rawKey !== "string") return null;
    const keyHash = ApiKeyService.hashKey(rawKey);
    return ApiKeyRepository.findByKeyHash(keyHash);
  }

  static async getInfoByRawKey(rawKey) {
    return ApiKeyService.authenticate(rawKey);
  }
}

module.exports = ApiKeyService;
