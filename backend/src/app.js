// backend/src/app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan"); // Add morgan for better logging

require('./config/db');  // Import your database connection
require('dotenv').config();

const authRoutes = require("./routes/auth");

const app = express();

// CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // React frontend origin
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies or auth headers
}));

// Middleware for parsing JSON
app.use(express.json());

// Use morgan for logging requests in development mode
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Middleware to log requests for debugging (optional if using morgan)
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log("Request body:", req.body);
    next();
});

// Routes
app.use("/auth", authRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging
    res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3001;  // Allow dynamic port allocation via environment variable
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});