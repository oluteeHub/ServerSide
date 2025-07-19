const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    actionType: String, // "CREATE_USER", "ISSUE_QUERY", "PROCESS_PAYROLL", etc.
    description: String,
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);


// This model will be used to log actions performed by users in the system.