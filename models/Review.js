const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Assuming you have a Company model
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
  imageUrl: { type: String }, // Add this field to store the image URL
  // Add other fields as needed
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
