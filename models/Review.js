const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // existing fields
  productName: String,
  rating: Number,
  comments: String,
  // new field for user reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
