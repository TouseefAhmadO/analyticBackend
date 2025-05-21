const express = require("express");
const cors = require("cors");
const connectDB = require("./middleware/connectDB");
require("dotenv").config();

const app = express();

app.use(cors())

// ✅ CORS Configuration
// app.use(
//   cors({
//     origin: "*", // Replace with your frontend URL in production, e.g., "https://your-frontend.vercel.app"
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// ✅ Body parser
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/auth", require("../routes/auth"));



const port =  process.env.PORT
app.listen(port, () => {
  console.log("app is running on port " + port);
  
})
