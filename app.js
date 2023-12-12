const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const UserActivation = require('./models/UserActivation');
const path = require('path'); // Add this line to include the 'path' module
const cloudinary = require('./cloudinaryConfig');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// ... (rest of your code)
