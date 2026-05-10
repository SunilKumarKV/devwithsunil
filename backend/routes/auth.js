const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { allowPublicRegistration } = require("../config");
const router = express.Router();

if (allowPublicRegistration) {
  router.post(
    "/register",
    [
      body("name").trim().notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Valid email is required"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be 6+ characters"),
    ],
    authController.register,
  );
} else {
  router.post("/register", (req, res) => {
    res.status(403).json({
      status: "error",
      message: "Public registration is disabled in production.",
    });
  });
}

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login,
);

module.exports = router;
