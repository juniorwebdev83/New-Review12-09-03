const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, city, state } = req.body;
    const newUser = new User({ email, city, state });
    await User.register(newUser, password);
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login user
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send('Login successful.');
});

// Logout user
router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logout successful.');
});

module.exports = router;
