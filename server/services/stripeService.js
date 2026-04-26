const TIERS = require("../config/tiers");
const env = require("../config/environment");

class StripeService {
  static isConfigured() {
    return !!(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET);
  }

  static getClient() {
    if (!env.STRIPE_SECRET_KEY) {
      const err = new Error(
        "STRIPE_SECRET_KEY is not set. Add it to your .env file."
      );
      err.statusCode = 503;
      err.code = "STRIPE_NOT_CONFIGURED";
      throw err;
    }
    return require("stripe")(env.STRIPE_SECRET_KEY);
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
      payload,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );
  }
}

module.exports = StripeService;
