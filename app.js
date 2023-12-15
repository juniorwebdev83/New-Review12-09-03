require('dotenv-safe').config({ example: false });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cloudinary = require('./cloudinaryConfig');
const Review = require('./models/Review');
const User = require('./models/User'); // Add this line to import the User model
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const session = require('express-session');

const app = express();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectToDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || crypto.randomBytes(64).toString('base64'),
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Your routes
app.use('/users', require('./users/imageRoutes'));

app.get('/', (req, res) => {
  res.send('Welcome to the Review App');
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
