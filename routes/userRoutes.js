// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Import your User model

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate user input (e.g., using joi library)

  const newUser = new User({ username, email, password }); // Create new user object

  try {
    await newUser.save(); // Save user data to MongoDB
    res.send({ message: 'Registration successful!' }); // Send confirmation message
  } catch (error) {
    // Handle errors such as duplicate email or validation failures
    res.status(400).send({ error: error.message });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials against your database
  const user = await User.findOne({ username }).select('+password'); // Include password field

  if (!user || !user.comparePassword(password)) { // Compare password using a secure method
    return res.status(401).send({ error: 'Invalid username or password' });
  }

  // Generate authentication token (e.g., using jsonwebtoken library)
  const token = generateToken(user._id);

  // Send token to client through cookie or header
  res.cookie('auth_token', token, { httpOnly: true }); // Cookie option is just an example

  res.send({ message: 'Login successful!', user: user }); // Send user data and success message
});

module.exports = router;
