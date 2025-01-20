const express = require("express");
const User = require('../models/userModel'); // Make sure your User model is adjusted accordingly (no bcrypt)
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register Route - User Sign Up
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user with plain text password
    const newUser = new User({ username, email, password });

    // Save the new user
    await newUser.save();

    // Hardcoded JWT Secret
    const token = jwt.sign({ userId: newUser._id }, 'my-very-secure-secret', { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route - Real Authentication
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the stored password (plain text)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token if passwords match
    const token = jwt.sign({ userId: user._id }, 'my-very-secure-secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;