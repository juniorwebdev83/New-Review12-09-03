const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cloudinary = require('./cloudinaryConfig');
const Review = require('./models/Review');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const session = require('express-session');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectToDatabase();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: process.env.SESSION_SECRET || crypto.randomBytes(64).toString('base64'), resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(Review.authenticate()));
passport.serializeUser(Review.serializeUser());
passport.deserializeUser(Review.deserializeUser());

app.use('/users', require('./users/imageRoutes'));

app.get('/', (req, res) => {
  res.send('Welcome to the Review App'); // Adjust the response as needed
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'users', 'upload.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
