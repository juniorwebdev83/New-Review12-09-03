const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const reviewSchema = new mongoose.Schema({
    text: String,
    rating: Number,
    cloudinaryImageUrl: String,
    likes: Number,
    username: { type: String, required: true }, // Ensure a valid username is provided
    // other fields as needed
});

reviewSchema.plugin(passportLocalMongoose);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
