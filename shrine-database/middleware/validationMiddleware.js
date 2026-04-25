const { body, param, query, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "Validation failed",
      details: errors.array().map((e) => e.msg),
    });
  }
  next();
};

const shrineCreateRules = [
  body("name").trim().notEmpty().withMessage("name is required").isLength({ max: 200 }).withMessage("name must be under 200 characters"),
  body("location").optional().trim().isLength({ max: 300 }).withMessage("location must be under 300 characters"),
  body("address").optional().trim().isLength({ max: 500 }).withMessage("address must be under 500 characters"),
  body("country").optional().trim().isLength({ max: 100 }).withMessage("country must be under 100 characters"),
  body("coordinates.latitude").optional().isFloat({ min: -90, max: 90 }).withMessage("latitude must be between -90 and 90"),
  body("coordinates.longitude").optional().isFloat({ min: -180, max: 180 }).withMessage("longitude must be between -180 and 180"),
];

const shrineUpdateRules = [
  body("name").optional().trim().notEmpty().withMessage("name cannot be empty").isLength({ max: 200 }),
  body("location").optional().trim().isLength({ max: 300 }),
  body("address").optional().trim().isLength({ max: 500 }),
  body("country").optional().trim().isLength({ max: 100 }),
  body("coordinates.latitude").optional().isFloat({ min: -90, max: 90 }),
  body("coordinates.longitude").optional().isFloat({ min: -180, max: 180 }),
];

const registerRules = [
  body("email").trim().isEmail().withMessage("A valid email address is required").normalizeEmail().isLength({ max: 254 }),
];

const upgradeRules = [
  body("tier").isIn(["developer", "pro"]).withMessage("tier must be 'developer' or 'pro'"),
];

const objectIdParam = [
  param("id").isMongoId().withMessage("Invalid shrine ID format"),
];

const shrineQueryRules = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be between 1 and 100"),
  query("search").optional().trim().isLength({ max: 200 }).withMessage("search must be under 200 characters"),
  query("country").optional().trim().isLength({ max: 100 }).withMessage("country must be under 100 characters"),
];

module.exports = {
  validate,
  shrineCreateRules,
  shrineUpdateRules,
  registerRules,
  upgradeRules,
  objectIdParam,
  shrineQueryRules,
};
