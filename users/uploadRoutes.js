const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig');
const Review = require('../models/Review');

const upload = multer({ dest: 'uploads/' });

// POST request to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Use Cloudinary SDK to upload the image
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new review with the form data and Cloudinary image URL
    const newReview = new Review({
      text: req.body.text,
      rating: req.body.rating,
      cloudinaryImageUrl: result.secure_url,
      // other fields as needed
    });

    // Save the new review to the database
    await newReview.save();

    res.json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, error: 'Image upload failed' });
  }
});

module.exports = router;
