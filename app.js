// Import required modules
require('dotenv-safe').config({ example: false });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Create an instance of the Express application
const app = express();

// Function to connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Call the function to connect to the database
connectToDatabase();

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

// Middleware to parse JSON and handle URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for user-related operations
app.use('./users', require('./users/userRoutes'));  // Ensure correct path here

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Review App');
});

// Routes for user-related operations
app.use('/users', require('./users/userRoutes'));  // Ensure correct path here

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Review App');
});

// Route for serving the registration form
app.get('/forms/registerForm.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Forms', 'registerForm.html'));
});

// JWT-based authentication middleware
function authenticateJWT(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token verification failed' });

    req.user = user;
    next();
  });
}

// Example route that requires authentication
app.get('/dashboard', authenticateJWT, (req, res) => {
  res.send(`Welcome to the dashboard, ${req.user.email}!`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
