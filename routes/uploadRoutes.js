// uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Set up multer middleware
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage }).single('image');

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

module.exports = router;
