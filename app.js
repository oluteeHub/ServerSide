const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminUploadRoutes = require("./routes/adminVault.routes");
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", adminUploadRoutes);
// 404 Handler
app.use("*", (_, res) =>
	res.status(404).json({ message: "Route Not Found" })
);

module.exports = app;
