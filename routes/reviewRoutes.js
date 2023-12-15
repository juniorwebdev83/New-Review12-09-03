const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Review = require('../models/Review');
const User = require('../models/User'); // Update the path based on your User model location
const { authenticateJWT } = require('../users/auth');

// Set up multer middleware for image upload
const multer = require('multer');
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage }).single('image'); // Change to 'single'


// Route for handling image upload
router.post('/upload', upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'uploads', // Change the folder name as needed
      allowed_formats: ['jpg', 'png'],
    });

    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

// Route for submitting a review with image
router.post('/submit-review', authenticateJWT, upload, async (req, res) => {
  try {
    const { productName, rating, comments, companyId } = req.body;
    const userId = req.user.userId;

    let imageUrl = ''; // Initialize image URL

    // Check if an image was uploaded
    if (req.file) {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: 'uploads', // Change the folder name as needed
        allowed_formats: ['jpg', 'png'],
      });

      imageUrl = result.secure_url; // Set image URL
    }

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

    // Update user's profile with the Cloudinary image URL if needed
    await User.findByIdAndUpdate(userId, { $set: { profileImageUrl: imageUrl } });

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (rest of the code remains the same)

module.exports = router;
