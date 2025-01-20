const express = require("express");
const cors = require("cors");

// Import routes (adjust path if auth.js is in a subdirectory)
const authRoutes = require("./routes/auth"); // Update path if necessary

const app = express();

// CORS Configuration
app.use(cors({
    origin: "http://localhost:3000", // React frontend origin
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies or auth headers
}));

// Middleware for parsing JSON
app.use(express.json());

// Middleware to log requests for debugging
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log("Request body:", req.body);
    next();
});

// Routes
app.use("/auth", authRoutes);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});