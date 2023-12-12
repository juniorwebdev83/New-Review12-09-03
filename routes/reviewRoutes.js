const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to get all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new review
router.post('/reviews', async (req, res) => {
  try {
    const { text, rating, cloudinaryImageUrl, likes, username } = req.body;
    const newReview = new Review({ text, rating, cloudinaryImageUrl, likes, username });
    await newReview.save();
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a review by ID
router.delete('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully', deletedReview });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more routes for updating, retrieving a single review, etc., as needed

module.exports = router;
