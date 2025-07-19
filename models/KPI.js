const mongoose = require("mongoose");

const kpiSchema = new mongoose.Schema(
	{
		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
		},
		employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		period: String, // e.g., "May 2025"
		score: Number,
		breakdown: [{ metric: String, score: Number }],
		remarks: String,
		ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("KPI", kpiSchema);
