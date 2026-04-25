const TIERS = require("../config/tiers");

class StripeService {
  static getClient() {
    if (!process.env.STRIPE_SECRET_KEY) {
      const err = new Error("STRIPE_SECRET_KEY is not configured.");
      err.statusCode = 503;
      throw err;
    }
    return require("stripe")(process.env.STRIPE_SECRET_KEY);
  }

  static async createCheckoutSession({ email, tier, keyHash, successUrl, cancelUrl }) {
    const stripe = StripeService.getClient();
    const tierConfig = TIERS[tier];
    if (!tierConfig?.stripePriceId) {
      const err = new Error(`No Stripe price configured for tier: ${tier}`);
      err.statusCode = 400;
      throw err;
    }
    return stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: tierConfig.stripePriceId, quantity: 1 }],
      metadata: { keyHash, targetTier: tier },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }

  static constructWebhookEvent(payload, sig) {
    return StripeService.getClient().webhooks.constructEvent(
      payload, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  }
}

module.exports = StripeService;
