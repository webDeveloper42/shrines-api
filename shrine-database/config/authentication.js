// Key generation is handled by ApiKeyService (services/ApiKeyService.js).
// This file is kept for backwards compatibility — prefer importing ApiKeyService directly.
const ApiKeyService = require("../services/ApiKeyService");

module.exports = {
  generateApiKey: () => ApiKeyService.generateRawKey(),
  hashKey: (rawKey) => ApiKeyService.hashKey(rawKey),
};
