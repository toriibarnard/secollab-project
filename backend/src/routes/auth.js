// backend/src/routes/auth.js
const express = require("express");
const router = express.Router();

// Mock login endpoint
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Simple mock authentication logic
    if (username === "admin" && password === "password") {
        res.status(200).json({ message: "Login successful", token: "mock-token" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;
