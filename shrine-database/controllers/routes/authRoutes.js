const { Router } = require("express");
const { register, getKeyInfo } = require("../authController");

const router = Router();

router.post("/register", register);
router.get("/me", getKeyInfo);

module.exports = router;
