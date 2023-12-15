// Import required modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');
const User = require('../models/User'); // Adjust the relative path here
const { authenticateJWT } = require('./auth'); // Adjust the relative path here

// Helper function to generate a unique username
function generateUniqueUsername() {
  // Implement your logic to generate a unique username here
  // You can use a library like `uniqid` or any custom logic
  // Return the generated username
}

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generate a unique username or ensure it's provided
    const username = req.body.username || generateUniqueUsername();

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username is already taken.');
    }

    // Continue with registration
    const user = new User({ email, username, password });
    await user.save();

    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Rest of the code for login, profile, etc.

// Export the router
module.exports = router;
