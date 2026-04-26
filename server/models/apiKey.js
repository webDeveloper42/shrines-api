const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    keyHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    tier: {
      type: String,
      enum: ["free", "developer", "pro"],
      default: "free",
    },
    dailyRequestCount: { type: Number, default: 0, min: 0 },
    dailyRequestReset: { type: Date, default: () => new Date() },
    stripeCustomerId: { type: String, default: null },
    stripeSubscriptionId: { type: String, default: null },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    strict: true,
  }
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
