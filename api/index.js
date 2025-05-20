const express = require("express");
const connectDB = require("./middleware/connectDB");
require("dotenv").config();
const serverless = require("serverless-http");

const app = express();

// ✅ Manual CORS Middleware (reliable on Vercel)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001"); // your frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // respond to preflight
  }

  next();
});

app.use(express.json());

// Connect to MongoDB
connectDB();

// ✅ Use route without /api prefix
app.use("/auth", require("../routes/auth"));

module.exports.handler = serverless(app);
