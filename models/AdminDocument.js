const mongoose = require("mongoose");

const AdminDocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Admin ID
    required: true,
  },
  documentType: {
    type: String,
    enum: ["promotion", "query", "salary_increment", "warning", "appointment", "termination"],
    required: true,
  },
  title: String,
  notes: String,
  fileUrl: {
    type: String,
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AdminDocument", AdminDocumentSchema);
