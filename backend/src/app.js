// backend/src/app.js
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Start Server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});