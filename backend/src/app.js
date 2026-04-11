const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;