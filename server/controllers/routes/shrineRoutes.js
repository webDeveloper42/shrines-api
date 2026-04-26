const { Router } = require("express");
const { authenticate, publicRead } = require("../../middleware/authMiddleware");
const {
  validate,
  shrineCreateRules,
  shrineUpdateRules,
  objectIdParam,
  shrineQueryRules,
} = require("../../middleware/validationMiddleware");
const {
  getShrines,
  getShrine,
  createShrine,
  updateShrine,
  deleteShrine,
} = require("../shrineController");

const router = Router();

router.get("/", publicRead, shrineQueryRules, validate, getShrines);
router.get("/:id", publicRead, objectIdParam, validate, getShrine);
router.post("/", authenticate, shrineCreateRules, validate, createShrine);
router.put("/:id", authenticate, objectIdParam, shrineUpdateRules, validate, updateShrine);
router.delete("/:id", authenticate, objectIdParam, validate, deleteShrine);

module.exports = router;
