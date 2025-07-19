const AdminDocument = require("../models/AdminDocument");
const User = require("../models/User");

exports.uploadAdminDoc = async (req, res) => {
  try {
    const { userId } = req.params;
    const { documentType, title, notes } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No document uploaded" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newDoc = new AdminDocument({
      user: userId,
      uploadedBy: req.user._id,
      documentType,
      title,
      notes,
      fileUrl: `${req.protocol}://${req.get("host")}/uploads/admin_documents/${file.filename}`,
    });

    await newDoc.save();

    res.status(201).json({ message: "Document uploaded", data: newDoc });
  } catch (err) {
    console.error("Admin doc upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserAdminDocs = async (req, res) => {
  try {
    const { userId } = req.params;

    const docs = await AdminDocument.find({ user: userId }).sort({ issuedAt: -1 });

    res.status(200).json({ documents: docs });
  } catch (err) {
    console.error("Fetching user documents error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
