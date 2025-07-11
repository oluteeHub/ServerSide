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
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/org", require("./routes/org.routes"));
// app.use("/api/users", require("./routes/user.routes"));
// app.use("/api/payroll", require("./routes/payroll.routes"));
// app.use("/api/letters", require("./routes/letter.routes"));

// 404 Handler
// app.use("*", (_, res) => res.status(404).json({ message: "Route Not Found" }));

module.exports = app;
