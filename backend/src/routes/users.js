// backend/routes/users.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Route to fetch all users except the logged-in user
router.get("/", async (req, res) => {
  try {
    // Exclude the logged-in user from the list
    const currentUser = req.user; // Assuming you're attaching user to req (via authentication middleware)
    const users = await User.find({ _id: { $ne: currentUser._id } }).select("username");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

module.exports = router;