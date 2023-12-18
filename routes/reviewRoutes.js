const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Review = require('../models/Review');
const User = require('../models/User');
const { authenticateJWT } = require('../users/auth');
const axios = require('axios'); // Add this line to import axios
const router = express.Router();

// Set up multer middleware with Cloudinary storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Function to fetch location info from Google Maps Geocoding API
async function fetchLocationInfo(address) {
  const apiKey = 'AIzaSyCBVQCVh1JUhMJqHFhs8ZvS2KI_1041_4k'; // Replace with your actual API key
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const location = response.data.results[0].address_components;
    const city = location.find(component => component.types.includes('locality'))?.long_name || '';
    const county = location.find(component => component.types.includes('administrative_area_level_2'))?.long_name || '';

    return { city, county };
  } catch (error) {
    console.error('Error fetching location info:', error.message);
    return { city: '', county: '' };
  }
}

// Submit a review with image upload
router.post('/submit-review', authenticateJWT, upload, async (req, res) => {
  try {
    const { productName, rating, comments } = req.body;
    const userId = req.user.userId; // Assuming userId is included in the JWT payload
    const companyId = req.body.companyId; // Replace with your logic to get companyId

    // Fetch city and county based on the provided address (you might need to adjust this based on your form structure)
    const address = `${req.body.city}, ${req.body.state}, ${req.body.county}`;
    const { city, county } = await fetchLocationInfo(address);

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
