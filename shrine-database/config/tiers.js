const TIERS = {
  free: {
    label: "Free",
    price: 0,
    dailyLimit: 100,
    allowedMethods: ["GET"],
    allowedPaths: ["/api/shrines"],
    stripePriceId: null,
  },
  developer: {
    label: "Developer",
    price: 9,
    dailyLimit: 10000,
    allowedMethods: ["GET"],
    allowedPaths: ["/api/shrines", "/api/shrines/:id"],
    stripePriceId: process.env.STRIPE_DEVELOPER_PRICE_ID,
  },
  pro: {
    label: "Pro",
    price: 29,
    dailyLimit: Infinity,
    allowedMethods: ["GET", "POST", "PUT", "DELETE"],
    allowedPaths: ["*"],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
};

module.exports = TIERS;
