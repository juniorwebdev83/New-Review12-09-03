const express = require('express');
const multer = require('multer');
const Review = require('../models/Review');
const User = require('../models/User');
const { authenticateJWT } = require('../users/auth');
const axios = require('axios');
const cloudinary = require('cloudinary').v2; // Import cloudinary
const router = express.Router();

// Set up multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Function to fetch location info from Google Maps Geocoding API
// (Assuming you have this function already implemented)

// Submit a review with image upload
router.post('/submit-review', authenticateJWT, upload, async (req, res) => {
  try {
    const { productName, rating, comments } = req.body;
    const userId = req.user.userId;
    const companyId = req.body.companyId;

    // Check if an image is uploaded
    let imageUrl = ''; // Initialize imageUrl

    if (req.file) {
      // If an image is uploaded, upload it to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));
      imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    }

    // Your existing code for submitting a review goes here
    // ...

    // Create a new Review instance and save it to the database
    const newReview = new Review({
      productName,
      rating,
      comments,
      companyId,
      userId,
      imageUrl, // Store the image URL in the database
      city: req.body.city,
      state: req.body.state,
      county: req.body.county,
    });

    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);

    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: 'Invalid input data. Please check your fields.' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
