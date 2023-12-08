// uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig'); // Update the path based on your project structure

// Set up multer middleware
const upload = multer({ dest: 'uploads/' }).single('image');

// Route for handling image upload
router.post('/upload', upload, async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

module.exports = router;
