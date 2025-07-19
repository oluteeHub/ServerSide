const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Admin signup (creates org)
router.post("/signup-admin", authController.adminSignup);

// Employee signup via invite link
router.post("/signup-invite", authController.employeeSignupViaInvite);

// Login
router.post("/login", authController.login);

module.exports = router;
