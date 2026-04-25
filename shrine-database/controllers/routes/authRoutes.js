const { Router } = require("express");
const { authLimiter } = require("../../middleware/rateLimitMiddleware");
const { validate, registerRules } = require("../../middleware/validationMiddleware");
const { register, getKeyInfo } = require("../authController");

const router = Router();

router.post("/register", authLimiter, registerRules, validate, register);
router.get("/me", getKeyInfo);

module.exports = router;
