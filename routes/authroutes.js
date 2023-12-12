// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const UserActivation = require('../models/UserActivation');

const router = express.Router();

// Registration form
router.get('/register', (req, res) => {
  res.render('register'); // Create a register.ejs file for the registration form
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, city, state } = req.body;
    await UserActivation.register(new UserActivation({ email, city, state }), password);
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.render('register', { error: error.message });
  }
});

// Login form
router.get('/login', (req, res) => {
  res.render('login'); // Create a login.ejs file for the login form
});

// Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirect to the dashboard after successful login
  failureRedirect: '/login',
  failureFlash: true,
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
