const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  // other user properties
});

module.exports = mongoose.model('User', userSchema);
