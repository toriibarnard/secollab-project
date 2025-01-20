// backend/src/routes/auth.js

const express = require("express");
const User = require('../models/userModel'); // no bcrypt
const jwt = require('jsonwebtoken');

const router = express.Router();

// register route - user Sign Up
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // create a new user with plain text password
    const newUser = new User({ username, email, password });

    // save the new user
    await newUser.save();

    // hardcoded JWT Secret
    const token = jwt.sign({ userId: newUser._id }, 'my-very-secure-secret', { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// login route - real authentication
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // compare the entered password with the stored password (plain text)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // generate JWT token if passwords match
    const token = jwt.sign({ userId: user._id }, 'my-very-secure-secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;