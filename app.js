// Import required modules
require('dotenv-safe').config({
	example: false
  });
  const express = require('express');
  const mongoose = require('mongoose');
  const path = require('path');
  const jwt = require('jsonwebtoken');
  const cloudinary = require('cloudinary').v2;
  
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
  
  // Configure Cloudinary
  cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // Middleware to log incoming requests
  app.use((req, res, next) => {
	console.log(`Received ${req.method} request to ${req.url}`);
	next();
  });
  
  // Middleware to parse JSON and handle URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({
	extended: true
  }));
  
  // Routes for user-related operations
  const userRoutes = require('./routes/userRoutes'); // Import userRoutes module
  app.use('/users', userRoutes);
  
  // Route for serving the registration form
  app.get('/Forms/registerForm.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'Forms', 'registerForm.html'));
  });
  
  // Route for serving the login form
  app.get('/Forms/loginForm.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'Forms', 'loginForm.html'));
  });
  
  // No need to use cloudinary here as middleware
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
  });
  