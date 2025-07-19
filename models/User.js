const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
			required: false,
		},
		role: {
			type: String,
			enum: ["admin", "staff"],
			default: "staff",
		},
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: String,
		address: String,
		password: { type: String, required: true },
		profilePic: String,

		// Employment Details
		position: String,
		appointmentType: {
			type: String,
			enum: ["intern", "contract", "fulltime", "parttime"],
		},
		dateOfAppointment: Date,
		salary: { type: Number, default: 0 },

		// HR Docs
		letters: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Letter" },
		],
		kpis: [{ type: mongoose.Schema.Types.ObjectId, ref: "KPI" }],
		leaveRecords: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Leave" },
		],
		documents: [
			{
				type: {
					type: String,
					enum: [
						"kyc_passport",
						"kyc_nin",
						"kyc_id",
						"resignation",
						"appointment_letter",
						"termination",
					],
				},
				fileUrl: String,
				uploadedBy: {
					type: String,
					enum: ["self", "admin"],
				},
				status: {
					type: String,
					enum: ["pending", "approved", "rejected"],
					default: "approved", // for most docs
				},
				uploadedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],

		// Other
		isSuspended: { type: Boolean, default: false },
		nextOfKin: {
			name: String,
			phone: String,
			relationship: String,
			address: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
