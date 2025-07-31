const User = require("../models/User");

exports.adminUpdateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const updates = req.body;

		console.log("Update request:", { userId, updates });
		console.log("Admin user:", {
			id: req.user._id,
			role: req.user.role,
			organization: req.user.organization,
		});

		// Also populate organization for the target user
		const user = await User.findById(userId).populate("organization");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		console.log("Target user:", {
			id: user._id,
			role: user.role,
			organization: user.organization,
		});

		// Only allow org admins to update user details in their organization
		if (req.user.role !== "admin") {
			console.log("❌ Not an admin");
			return res
				.status(403)
				.json({ message: "Forbidden - Not an admin" });
		}

		if (
			req.user.organization.toString() !==
			user.organization.toString()
		) {
			console.log("Different organizations");
			return res
				.status(403)
				.json({ message: "Forbidden - Different organization" });
		}

		console.log("Authorization passed, updating user...");

		// Update user details
		Object.assign(user, updates);
		await user.save();

		console.log("User updated successfully");

		res.status(200).json({
			message: "User updated successfully",
			user,
		});
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: "Server error" });
	}
};

exports.toggleSuspendUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId).populate("organization");
		if (!user)
			return res.status(404).json({ message: "User not found" });

		// Only same org admin
		if (
			req.user.role !== "admin" ||
			String(req.user.organization) !== String(user.organization)
		) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		user.isSuspended = !user.isSuspended;
		await user.save();

		res.status(200).json({
			message: `User ${
				user.isSuspended ? "suspended" : "unsuspended"
			} successfully`,
			user,
		});
	} catch (err) {
		console.error("Toggle suspend error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

exports.changeUserRole = async (req, res) => {
	try {
		const { userId } = req.params;
		const { role } = req.body;

		if (!["admin", "staff"].includes(role)) {
			return res.status(400).json({ message: "Invalid role" });
		}

		const user = await User.findById(userId).populate("organization");
		if (!user)
			return res.status(404).json({ message: "User not found" });

		if (
			req.user.role !== "admin" ||
			String(req.user.organization) !== String(user.organization)
		) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		user.role = role;
		await user.save();

		res.status(200).json({
			message: `User role changed to ${role}`,
			user,
		});
	} catch (err) {
		console.error("Change role error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

exports.getOrgEmployees = async (req, res) => {
	try {
		if (!req.user.organization)
			return res
				.status(400)
				.json({ message: "User has no organization" });

		const employees = await User.find({
			organization: req.user.organization,
		})
			.select("-password")
			.sort({ createdAt: -1 });

		res.status(200).json({ employees });
	} catch (err) {
		console.error("Fetch employees error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

exports.uploadKYC = async (req, res) => {
	try {
		const userId = req.user._id;
		const { type } = req.body;

		if (!req.file)
			return res.status(400).json({ message: "No file uploaded" });

		const validTypes = ["kyc_passport", "kyc_nin", "kyc_id"];
		if (!validTypes.includes(type))
			return res
				.status(400)
				.json({ message: "Invalid document type" });

		const fileUrl = req.file.path;

		const user = await User.findById(userId);
		user.documents.push({
			type,
			fileUrl,
			uploadedBy: "self",
		});
		await user.save();

		res.status(200).json({ message: "Document uploaded", fileUrl });
	} catch (err) {
		console.error("KYC upload error:", err);
		res.status(500).json({ message: "Server error" });
	}
};
