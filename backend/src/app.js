const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,   // allows browser to send cookies from frontend
  })
);

app.use(express.json());
app.use(cookieParser());   // lets backend read req.cookies

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;