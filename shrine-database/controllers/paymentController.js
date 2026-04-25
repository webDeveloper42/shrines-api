const ApiKeyService = require("../services/ApiKeyService");
const ApiKeyRepository = require("../repositories/ApiKeyRepository");
const StripeService = require("../services/StripeService");

const STRIPE_NOT_CONFIGURED = {
  error: "Payment processing is not enabled on this instance.",
  setup:
    "Add STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_DEVELOPER_PRICE_ID, and " +
    "STRIPE_PRO_PRICE_ID to your .env file. See .env.example for step-by-step instructions.",
};

const createUpgradeSession = async (req, res, next) => {
  try {
    if (!StripeService.isConfigured()) {
      return res.status(503).json(STRIPE_NOT_CONFIGURED);
    }

    const { tier } = req.body;
    const rawKey = req.headers["x-api-key"];

    if (!rawKey) return res.status(401).json({ error: "Missing X-API-Key header." });

    const apiKeyDoc = await ApiKeyService.authenticate(rawKey);
    if (!apiKeyDoc) return res.status(401).json({ error: "Invalid API key." });
    if (apiKeyDoc.tier === tier) {
      return res.status(400).json({ error: `You are already on the ${tier} tier.` });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const session = await StripeService.createCheckoutSession({
      email: apiKeyDoc.email,
      tier,
      keyHash: apiKeyDoc.keyHash,
      successUrl: `${baseUrl}/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/api/payment/cancel`,
    });

    res.json({ checkoutUrl: session.url });
  } catch (err) {
    next(err);
  }
};

const handleWebhook = async (req, res, next) => {
  if (!StripeService.isConfigured()) {
    return res.status(503).json(STRIPE_NOT_CONFIGURED);
  }

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = StripeService.constructWebhookEvent(req.body, sig);
  } catch (err) {
    return res.status(400).json({
      error: "Webhook signature verification failed. Check that STRIPE_WEBHOOK_SECRET matches your Stripe dashboard or Stripe CLI output.",
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { keyHash, targetTier } = session.metadata;

      await ApiKeyRepository.updateByKeyHash(keyHash, {
        tier: targetTier,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
      });
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      await ApiKeyRepository.updateBySubscriptionId(subscription.id, {
        tier: "free",
        stripeSubscriptionId: null,
      });
    }

    res.json({ received: true });
  } catch (err) {
    next(err);
  }
};

const paymentSuccess = (_req, res) => {
  res.json({ message: "Payment successful. Your API key tier has been upgraded." });
};

const paymentCancel = (_req, res) => {
  res.json({ message: "Payment cancelled. Your tier was not changed." });
};

module.exports = { createUpgradeSession, handleWebhook, paymentSuccess, paymentCancel };
