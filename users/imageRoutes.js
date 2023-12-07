const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig'); // Adjust the path accordingly

const upload = multer({ dest: 'uploads/' }); // Set the destination folder for temporarily storing uploads

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Use Cloudinary SDK to upload the image
        console.log('Received file:', req.file); // Log information about the received file
        const result = await cloudinary.uploader.upload(req.file.path);

        // Store the Cloudinary URL in the corresponding MongoDB document (e.g., user document)
        console.log('Cloudinary response:', result); // Log information about the Cloudinary response

        res.json({ success: true, imageUrl: result.secure_url });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ success: false, error: 'Image upload failed' });
    }
});

module.exports = router;
