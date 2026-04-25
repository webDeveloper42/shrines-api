const { Router } = require("express");
const {
  createUpgradeSession,
  handleWebhook,
  paymentSuccess,
  paymentCancel,
} = require("../paymentController");

const router = Router();

router.post("/upgrade", createUpgradeSession);
router.post("/webhook", handleWebhook);
router.get("/success", paymentSuccess);
router.get("/cancel", paymentCancel);

module.exports = router;
