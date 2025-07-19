const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Organization = require("../models/Organization");
const generateToken = require("../utils/generateToken");

// Admin Signup - creates user, org, links both
exports.adminSignup = async (req, res) => {
	try {
		const { fullName, email, password, organizationName } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res
				.status(400)
				.json({ message: "Email already exists" });

		const slug =
			organizationName.toLowerCase().replace(/\s+/g, "-") +
			"-" +
			Math.floor(Math.random() * 10000);

		const hashedPassword = await bcrypt.hash(password, 10);

		// Step 1: Create admin user (no org attached yet)
		const adminUser = new User({
			fullName,
			email,
			password: hashedPassword,
			role: "admin",
		});

		await adminUser.validate(); // validates required fields except `organization`

		// Step 2: Create org
		const org = await Organization.create({
			name: organizationName,
			slug,
			email,
			admin: adminUser._id,
			employees: [adminUser._id],
		});

		// Step 3: Attach org to user & save again
		adminUser.organization = org._id;
		await adminUser.save();

		const token = generateToken(adminUser._id);

		res.status(201).json({
			message: "Admin signup successful",
			token,
			orgSlug: slug,
		});
	} catch (err) {
		console.error("Admin signup error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Employee Signup via Org Slug (invite only)
exports.employeeSignupViaInvite = async (req, res) => {
	try {
		const { fullName, email, password, orgSlug } = req.body;

		const org = await Organization.findOne({ slug: orgSlug });
		if (!org)
			return res
				.status(404)
				.json({ message: "Organization not found" });

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res
				.status(400)
				.json({ message: "Email already in use" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			fullName,
			email,
			password: hashedPassword,
			role: "staff",
			organization: org._id,
		});

		org.employees.push(newUser._id);
		await org.save();

		const token = generateToken(newUser._id);

		res.status(201).json({
			message: "Employee signup successful",
			token,
		});
	} catch (err) {
		console.error("Employee signup error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Login (admin or employee)
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).populate(
			"organization"
		);
		if (!user)
			return res.status(404).json({ message: "User not found" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(401).json({ message: "Invalid credentials" });

		const token = generateToken(user._id);

		res.status(200).json({
			message: "Login successful",
			token,
			user: {
				id: user._id,
				fullName: user.fullName,
				email: user.email,
				role: user.role,
				organization: user.organization,
			},
		});
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ message: "Server error" });
	}
};
