const ApiKey = require("../models/apiKey");
const { createCheckoutSession, constructWebhookEvent } = require("../services/stripeService");

const createUpgradeSession = async (req, res, next) => {
  try {
    const { tier } = req.body;
    const key = req.headers["x-api-key"];

    if (!key) return res.status(401).json({ error: "Missing X-API-Key header." });
    if (!["developer", "pro"].includes(tier)) {
      return res.status(400).json({ error: "tier must be 'developer' or 'pro'." });
    }

    const apiKeyDoc = await ApiKey.findOne({ key, active: true });
    if (!apiKeyDoc) return res.status(401).json({ error: "Invalid API key." });
    if (apiKeyDoc.tier === tier) {
      return res.status(400).json({ error: `You are already on the ${tier} tier.` });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const session = await createCheckoutSession({
      email: apiKeyDoc.email,
      tier,
      apiKey: key,
      successUrl: `${baseUrl}/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/api/payment/cancel`,
    });

    res.json({ checkoutUrl: session.url });
  } catch (err) {
    next(err);
  }
};

const handleWebhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = constructWebhookEvent(req.body, sig);
  } catch (err) {
    return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { apiKey, targetTier } = session.metadata;

      await ApiKey.findOneAndUpdate(
        { key: apiKey },
        {
          tier: targetTier,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
        }
      );
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      await ApiKey.findOneAndUpdate(
        { stripeSubscriptionId: subscription.id },
        { tier: "free", stripeSubscriptionId: null }
      );
    }

    res.json({ received: true });
  } catch (err) {
    next(err);
  }
};

const paymentSuccess = (req, res) => {
  res.json({ message: "Payment successful! Your API key tier has been upgraded." });
};

const paymentCancel = (req, res) => {
  res.json({ message: "Payment cancelled. Your tier was not changed." });
};

module.exports = { createUpgradeSession, handleWebhook, paymentSuccess, paymentCancel };
