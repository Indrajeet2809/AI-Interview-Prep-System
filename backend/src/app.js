const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth.routes");

connectDB();

app.use(cors);
app.use(express.json());
app.use("/api/auth", authRoutes);

module.exports = app;