const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cloudinary = require('./cloudinaryConfig');
const Review = require('./models/Review');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto'); // Updated this line
const session = require('express-session');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Add these lines for Passport initialization
app.use(session({ secret: process.env.SESSION_SECRET || crypto.randomBytes(64).toString('base64'), resave: false, saveUninitialized: false })); // Updated this line
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(Review.authenticate()));
passport.serializeUser(Review.serializeUser());
passport.deserializeUser(Review.deserializeUser());

// Add routes
app.use('/images', require('./users/uploadRoutes'));

// Serve the HTML form
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

// Your existing routes for submitting and retrieving reviews

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
