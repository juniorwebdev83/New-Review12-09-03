const express = require('express');
const multer = require('multer');
const Review = require('../models/Review');
const { authenticateJWT } = require('../users/auth');
const cloudinary = require('cloudinary').v2;
const reviewRouter = express.Router();

// Set up multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Submit a review with image upload
reviewRouter.post('/submit-review', authenticateJWT, upload, async (req, res) => {
  try {
    const { productName, rating, comments, companyId, city, state, county } = req.body;

    // Validate required fields
    if (!productName || !rating || !comments || !companyId || !city || !state || !county) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if an image is uploaded
    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));
      imageUrl = result.secure_url;
    }

    // Your existing code for submitting a review goes here
    // ...

    // Create a new Review instance and save it to the database
    const newReview = new Review({
      productName,
      rating,
      comments,
      companyId,
      userId: req.user.userId,
      imageUrl,
      city,
      state,
      county,
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

module.exports = reviewRouter;
