const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
	{
		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
		},
		employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		type: {
			type: String,
			enum: [
				"sick",
				"casual",
				"annual",
				"maternity",
				"study",
				"unpaid",
			],
		},
		reason: String,
		from: Date,
		to: Date,
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
		},
		requestedAt: { type: Date, default: Date.now },
		reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
