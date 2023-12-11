const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig');
const Review = require('../models/Review');
const path = require('path'); // Add this line to import the path module

const upload = multer({ dest: 'uploads/' });

// GET request to render the form
router.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));
});

// POST request to handle form submission
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
