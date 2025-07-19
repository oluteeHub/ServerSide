const express = require("express");
const router = express.Router();
const adminVaultController = require("../controllers/adminVault.controller");
const upload = require("../middlewares/uploadAdminDoc");
const requireAdmin = require("../middlewares/requireAdmin");
const protect = require("../middlewares/protect");

router.post(
	"/admin/upload/:userId",
	protect,
	requireAdmin,
	upload.single("document"),
	adminVaultController.uploadAdminDoc
);

router.get(
	"/admin/user-docs/:userId",
	protect,
	requireAdmin,
	// upload,
	adminVaultController.getUserAdminDocs
);
 
module.exports = router;