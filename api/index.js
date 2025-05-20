const express = require("express");
const cors = require("cors");
const connectDB = require("./middleware/connectDB");
require("dotenv").config();

const app = express();

// ✅ Allow requests from localhost:3001 (your frontend)
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", require("../routes/auth")); // ⚠️ Remove "/api" prefix here

// Export as serverless function
const serverless = require("serverless-http");
module.exports.handler = serverless(app);
