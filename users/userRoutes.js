// users/userRoutes.js
const express = require('express');
const passport = require('passport');
const User = require('./userModel');
const path = require('path');

const router = express.Router();

// Register user route
router.post('/register', async (req, res) => {
  try {
    const { email, password, confirmPassword, city, state } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Create a new user
    const newUser = new User({ email, city, state });

    // Register the user with Passport-Local Mongoose
    await User.register(newUser, password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Display the registration form
router.get('/register', (req, res) => {
  res.sendFile('registerUser.html', { root: __dirname });
});

// Other user-related routes can be added here

module.exports = router;
