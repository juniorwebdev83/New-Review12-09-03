const express = require('express');
const cloudinary = require('cloudinary').v2;
const Review = require('../models/Review'); // Assuming you have a Review model
const User = require('../models/User'); // Assuming you have a User model
const { authenticateJWT } = require('./auth'); // Assuming you have this middleware

const router = express.Router();

// Submit a review with image upload
router.post('/submit-review', authenticateJWT, async (req, res) => {
  try {
    const { productName, rating, comments, companyId, image } = req.body;
    const userId = req.user.userId;

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: 'review-app', // Adjust the folder as needed
      resource_type: 'auto', // Automatically determine the type of file
    });

    // Create a new review with the Cloudinary image URL
    const newReview = new Review({
      productName,
      rating,
      comments,
      companyId,
      userId,
      imageUrl: cloudinaryResponse.secure_url,
    });

    // Save the review to the database
    await newReview.save();

    // Update user's profile with the Cloudinary image URL if needed
    await User.findByIdAndUpdate(userId, { $set: { profileImageUrl: cloudinaryResponse.secure_url } });

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (other routes)

module.exports = router;
