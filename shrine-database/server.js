require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/database");

const shrineRoutes = require("./controllers/routes/shrineRoutes");
const authRoutes = require("./controllers/routes/authRoutes");
const paymentRoutes = require("./controllers/routes/paymentRoutes");

const app = express();
const { PORT = 3000 } = process.env;

// raw body needed for Stripe webhook signature verification
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" })
);

app.use(cors());
app.use(express.json());

app.use("/api/shrines", shrineRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// global error handler
app.use((err, req, res, _next) => {
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Shrine Database API running on port ${PORT}`);
});

module.exports = app;
