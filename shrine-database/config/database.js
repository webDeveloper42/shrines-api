const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost/shrines";

mongoose
  .connect(uri)
  .then(async () => {
    console.log("MongoDB connected");
    await removeLegacyApiKeys();
  })
  .catch((err) => console.error("MongoDB connection error:", err.message));

async function removeLegacyApiKeys() {
  try {
    const result = await mongoose.connection
      .collection("apikeys")
      .deleteMany({ keyHash: null });

    if (result.deletedCount > 0) {
      console.log(
        `[migration] Removed ${result.deletedCount} legacy API key record(s) with null keyHash`
      );
    }
  } catch (err) {
    // collection may not exist yet on first run — that's fine
  }
}

module.exports = mongoose;
