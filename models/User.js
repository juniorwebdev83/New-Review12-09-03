const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: String,
  city: String,
  state: String,
});

userSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.authenticate = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ email: this.email, userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour, adjust as needed
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
