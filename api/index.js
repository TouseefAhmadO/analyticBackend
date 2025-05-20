const express = require("express");
const cors = require("cors");
const connectDB = require("./middleware/connectDB");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", require("../routes/auth"));

// Export as serverless function
const serverless = require("serverless-http");
module.exports.handler = serverless(app);
