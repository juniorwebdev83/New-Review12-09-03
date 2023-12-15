// users/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error('Invalid login credentials.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid login credentials.');

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// Protected route example
router.get('/profile', (req, res) => {
  // Extract user information from the token
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'your-secret-key');
  const userId = decodedToken.userId;

  // Fetch user data based on userId
  User.findById(userId)
    .then(user => {
      if (!user) throw new Error('User not found.');
      res.json(user);
    })
    .catch(error => res.status(404).send(error.message));
});

module.exports = router;
