// userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// User registration route
router.post('/register', async (req, res) => {
  // ... (existing registration route code)
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token for authentication
      const token = user.generateAuthToken();

      // Send the token in the response
      res.json({ token });
    } else {
      // If the user doesn't exist or the password is incorrect, send an error response
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle any errors that occur during the login process
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
