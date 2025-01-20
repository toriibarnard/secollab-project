// backend/src/app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan"); // add morgan for better logging

require('./config/db');  // import database connection
require('dotenv').config();

const authRoutes = require("./routes/auth");

const app = express();

// CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // react frontend origin
    methods: ["GET", "POST"], // allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
    credentials: true, // allow cookies or auth headers
}));

// middleware for parsing JSON
app.use(express.json());

// use morgan for logging requests in development mode
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// middleware to log requests for debugging
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log("Request body:", req.body);
    next();
});

// routes
app.use("/auth", authRoutes);

// global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // log the error stack for debugging
    res.status(500).json({ message: "Something went wrong!" });
});

// start the server
const PORT = process.env.PORT || 3001;  // allow dynamic port allocation via environment variable
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});