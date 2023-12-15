const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, city, state } = req.body;
    const newUser = new User({ email, city, state });
    await User.register(newUser, password);

    // Create a JWT token
    const token = jwt.sign({ email: newUser.email, userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour, adjust as needed
    });

    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate user
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }

    const isMatch = await foundUser.authenticate(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }

    // Create a JWT token
    const token = jwt.sign({ email: foundUser.email, userId: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour, adjust as needed
    });

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.' });
  }
});

// Logout user (not needed for JWT)

module.exports = router;
