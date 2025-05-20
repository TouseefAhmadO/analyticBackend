const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const XLSX = require("xlsx");
const path = require("path");
require("dotenv").config();

const filePath = path.join(__dirname, "../data/SAMPLE DATA.xlsx");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/excel-data", (req, res) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[1];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error reading Excel file:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to read Excel file" });
  }
});

module.exports = router;
