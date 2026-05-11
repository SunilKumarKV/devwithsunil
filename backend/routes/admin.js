const express = require("express");
const adminController = require("../controllers/adminController");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", requireAuth, requireRole("admin"), adminController.dashboard);

module.exports = router;
