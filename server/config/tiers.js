const env = require("./environment");

const TIERS = {
  free: {
    label: "Free",
    price: 0,
    dailyLimit: 500,
    allowedMethods: ["GET"],
    stripePriceId: null,
  },
  developer: {
    label: "Developer",
    price: 9,
    dailyLimit: 20000,
    allowedMethods: ["GET"],
    stripePriceId: env.STRIPE_DEVELOPER_PRICE_ID,
  },
  pro: {
    label: "Pro",
    price: 29,
    dailyLimit: Infinity,
    allowedMethods: ["GET", "POST", "PUT", "DELETE"],
    stripePriceId: env.STRIPE_PRO_PRICE_ID,
  },
};

module.exports = TIERS;
