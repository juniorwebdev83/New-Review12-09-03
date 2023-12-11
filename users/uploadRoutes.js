// uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig'); // Update the path based on your project structure

// Set up multer middleware with Cloudinary storage
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploads', // Change the folder name as needed
  allowedFormats: ['jpg', 'png'],
});

const upload = multer({ storage: storage }).single('image');

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
