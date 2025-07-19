const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema(
	{
		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
		},
		employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		type: {
			type: String,
			enum: ["query", "promotion", "commendation", "warning"],
		},
		subject: String,
		body: String,
		issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		issuedAt: { type: Date, default: Date.now },
		downloadURL: String, // generated PDF link (optional)
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Letter", letterSchema);
