// routes/userRoutes.js
const bcrypt = require('bcrypt');

const express = require('express');

const router = express.Router();
const User = require('../models/User');

// User registration route
router.post('/register', async (req, res) => {
  const { email, password, city, state } = req.body;

  // Validate user input (you can use a validation library like Joi here)

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
    city,
    state,
  });

  try {
    // Save user data to MongoDB
    await newUser.save();
    res.status(201).send({ message: 'Registration successful!' });
  } catch (error) {
    // Handle errors such as duplicate email or validation failures
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
