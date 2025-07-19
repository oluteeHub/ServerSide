const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const requireAdmin = require("../middlewares/requireAdmin");
const protect = require("../middlewares/protect");
const upload = require("../utils/multer");
router.put(
	"/:userId",
	protect,
	requireAdmin,
	userController.adminUpdateUser
);

router.put(
	"/:userId/suspend",
	protect,
	requireAdmin,
	userController.toggleSuspendUser
);

router.put(
	"/:userId/role",
	protect,
	requireAdmin,
	userController.changeUserRole
);

// let all users access employees.
router.get(
	"/employees",
	protect,
	// requireAdmin,
	userController.getOrgEmployees
);

router.post(
	"/upload-kyc",
	protect,
	upload.single("document"),
	userController.uploadKYC
);
module.exports = router;
