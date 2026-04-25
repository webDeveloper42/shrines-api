const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    tier: {
      type: String,
      enum: ["free", "developer", "pro"],
      default: "free",
    },
    dailyRequestCount: { type: Number, default: 0 },
    dailyRequestReset: { type: Date, default: () => new Date() },
    stripeCustomerId: { type: String, default: null },
    stripeSubscriptionId: { type: String, default: null },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

apiKeySchema.methods.resetDailyCountIfNeeded = function () {
  const now = new Date();
  const lastReset = new Date(this.dailyRequestReset);
  const isNewDay =
    now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
    now.getUTCMonth() !== lastReset.getUTCMonth() ||
    now.getUTCDate() !== lastReset.getUTCDate();

  if (isNewDay) {
    this.dailyRequestCount = 0;
    this.dailyRequestReset = now;
  }
};

module.exports = mongoose.model("ApiKey", apiKeySchema);
