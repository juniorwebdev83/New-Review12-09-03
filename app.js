const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const imageRoutes = require('./users/imageRoutes.js');
const cloudinary = require('./cloudinaryConfig');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, );

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Add routes
app.use('/images', imageRoutes);

// Serve the HTML form
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
