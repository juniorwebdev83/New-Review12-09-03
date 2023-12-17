const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// User registration route
router.post('/register', async (req, res) => {
  const { email, password, city, state } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      city,
      state,
    });

    // Save user data to MongoDB
    await newUser.save();
    res.status(201).send({ message: 'Registration successful!' });
  } catch (error) {
    // Handle errors such as duplicate email or validation failures
    if (error.code === 11000) {
      // Duplicate key error
      const duplicateKey = Object.keys(error.keyPattern)[0];
      const duplicateValue = error.keyValue[duplicateKey];
      return res.status(400).send({ error: `User with ${duplicateKey} "${duplicateValue}" already registered.` });
    }

    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
