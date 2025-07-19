const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Basic server works" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});