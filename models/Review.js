const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  text: String,
  rating: Number,
  cloudinaryImageUrl: String,
  likes: Number,
  // other fields as needed
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
