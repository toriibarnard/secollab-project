// backend/src/app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan"); // for better logging
const http = require("http"); // for HTTP server to integrate Socket.IO
const socketIo = require("socket.io"); // for Socket.IO

require('./config/db');  // import database connection
require('dotenv').config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users"); // Import the users route to handle fetching user list

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
app.use("/api/users", userRoutes);  // Route to fetch users list

// global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // log the error stack for debugging
    res.status(500).json({ message: "Something went wrong!" });
});

// Create HTTP server and attach Socket.IO to it
const server = http.createServer(app);
const io = socketIo(server);

// In-memory store for users and their socket ids
let users = {};

// Socket.IO Configuration
io.on("connection", (socket) => {
    console.log("A user connected");

    // When a user sends their username, store it with their socket ID
    socket.on("register_user", (username) => {
        users[username] = socket.id;  // Store socket ID by username
        console.log(`User registered: ${username}`);
    });

    // Listen for incoming messages
    socket.on("send_message", (messageData) => {
        const { recipient, content, sender } = messageData;
        
        // Check if the recipient is online (in the 'users' map)
        if (users[recipient]) {
            // Emit message to the specific recipient using their socket ID
            io.to(users[recipient]).emit("receive_message", { sender, content });
            console.log(`Message sent from ${sender} to ${recipient}`);
        } else {
            console.log(`Recipient ${recipient} not found`);
        }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        // Clean up user from the mapping when they disconnect
        for (const [username, socketId] of Object.entries(users)) {
            if (socketId === socket.id) {
                delete users[username];
                console.log(`${username} disconnected`);
                break;
            }
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3001;  // allow dynamic port allocation via environment variable
server.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});