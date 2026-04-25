const { Router } = require("express");
const { authenticate, publicRead } = require("../../middleware/authMiddleware");
const {
  getShrines,
  getShrine,
  createShrine,
  updateShrine,
  deleteShrine,
} = require("../shrineController");

const router = Router();

// Public GET routes — no API key needed (web app browsing)
router.get("/", publicRead, getShrines);
router.get("/:id", publicRead, getShrine);

// Write routes — require a Pro API key
router.post("/", authenticate, createShrine);
router.put("/:id", authenticate, updateShrine);
router.delete("/:id", authenticate, deleteShrine);

module.exports = router;
