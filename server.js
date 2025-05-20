const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

// CORS fix
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.options("*", cors()); // Handle preflight requests

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));

// MongoDB connection (run once when serverless function initializes)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ❌ DO NOT use app.listen on Vercel
// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
