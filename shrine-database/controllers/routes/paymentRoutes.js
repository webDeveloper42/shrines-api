const { Router } = require("express");
const { paymentLimiter } = require("../../middleware/rateLimitMiddleware");
const { validate, upgradeRules } = require("../../middleware/validationMiddleware");
const {
  createUpgradeSession,
  handleWebhook,
  paymentSuccess,
  paymentCancel,
} = require("../paymentController");

const router = Router();

router.post("/upgrade", paymentLimiter, upgradeRules, validate, createUpgradeSession);
router.post("/webhook", handleWebhook); // no rate limit — Stripe controls delivery
router.get("/success", paymentSuccess);
router.get("/cancel", paymentCancel);

module.exports = router;
