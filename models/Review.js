// models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Replace 'Company' with the actual model name for your company
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with the actual model name for your user
    required: true,
  },
  imageUrl: String, // Add this field for storing the image URL
  city: String,
  state: String,
  county: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
