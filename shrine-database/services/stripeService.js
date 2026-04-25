const TIERS = require("../config/tiers");

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set. Add it to your .env file.");
  }
  return require("stripe")(process.env.STRIPE_SECRET_KEY);
};

const createCheckoutSession = async ({ email, tier, apiKey, successUrl, cancelUrl }) => {
  const stripe = getStripe();
  const tierConfig = TIERS[tier];
  if (!tierConfig || !tierConfig.stripePriceId) {
    throw new Error(`No Stripe price configured for tier: ${tier}`);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price: tierConfig.stripePriceId, quantity: 1 }],
    metadata: { apiKey, targetTier: tier },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
};

const constructWebhookEvent = (payload, sig) => {
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(
    payload,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
};

module.exports = { createCheckoutSession, constructWebhookEvent };
