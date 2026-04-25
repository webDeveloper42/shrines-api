const mongoose = require("mongoose");

const shrineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    address: { type: String, trim: true },
    country: { type: String, default: "Japan", trim: true },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shrine", shrineSchema);
