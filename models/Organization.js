const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    email: { type: String, required: true },
    phone: String,
    address: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
