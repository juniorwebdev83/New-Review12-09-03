// reviewRoutes.js
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Review = require('../models/reviewModel');
const { authenticateJWT } = require('./auth');
const uploadRoutes = require('./uploadRoutes'); // Import the image upload route

// Use the image upload route
router.use('/upload', uploadRoutes);

// Route for submitting a review with image
router.post('/submit-review', authenticateJWT, async (req, res) => {
  try {
    const { productName, rating, comments, companyId, imageUrl } = req.body;
    const userId = req.user.userId;

    // Create a new review
    const newReview = new Review({
      productName,
      rating,
      comments,
      companyId,
      userId,
      imageUrl, // Add image URL to the review
    });

    // Save the review to the database
    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
