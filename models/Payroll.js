const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    baseSalary: Number,
    additions: [
      {
        type: { type: String },
        amount: Number,
        reason: String,
      },
    ],
    deductions: [
      {
        type: { type: String },
        amount: Number,
        reason: String,
      },
    ],
    finalAmount: Number,
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentDate: Date,
    payMonth: String, // e.g. "June 2025"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", payrollSchema);
