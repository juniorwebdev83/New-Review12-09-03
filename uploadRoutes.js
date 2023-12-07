// uploadRoutes.js
const express = require('express');
const router = express.Router();
const cloudinary = require('./cloudinaryConfig');

router.post('/upload', async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image); // Assuming image is sent in the request body
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

module.exports = router;
