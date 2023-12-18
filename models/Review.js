const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String },
  city: String,
  state: String,
  county: String, // Change from "county" to "county"
  // Add other fields as needed
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
