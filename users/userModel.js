// users/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add a field for the Cloudinary image URL
  cloudinaryImageUrl: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
