const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { email, password, city, state } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      city,
      state,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);

    if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
      // Duplicate key error, indicating that the email already exists
      return res.status(400).json({ error: 'Email already exists. Please choose a different email.' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
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
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... rest of the code

module.exports = router; // Add this line to export the router object
