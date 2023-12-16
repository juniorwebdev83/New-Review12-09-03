const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Review = require('../models/Review');
const User = require('../models/User');
const { authenticateJWT } = require('../users/auth');
const router = express.Router();

// Set up multer middleware with Cloudinary storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Submit a review with image upload
router.post('/submit-review', authenticateJWT, upload, async (req, res) => {
  try {
    // Your existing code for submitting a review goes here
    // ...

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);

    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: 'Invalid input data. Please check your fields.' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (other routes)

module.exports = router;
