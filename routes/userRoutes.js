// routes/userRoutes.js

const express = require('express');
const multer = require('multer');
const Review = require('../models/Review');
const User = require('../models/User');
const { authenticateJWT } = require('../users/auth');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// Set up multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Submit a review with image upload
router.post('/submit-review', authenticateJWT, upload, async (req, res) => {
  try {
    const { productName, rating, comments, companyId } = req.body;
    const userId = req.user.userId;

    // Check if an image is uploaded
    let imageUrl = '';

    if (req.file) {
      // If an image is uploaded, upload it to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));
      imageUrl = result.secure_url;
    }

    // Create a new Review instance and save it to the database
    const newReview = new Review({
      productName,
      rating,
      comments,
      companyId,
      userId,
      imageUrl,
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
