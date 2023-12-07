// users/userController.js
const User = require('./userModel');

const registerUser = async (email, password, cloudinaryImageUrl) => {
  try {
    const user = new User({ email, password, cloudinaryImageUrl });
    await user.save();
    console.log('User registered successfully.');
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

module.exports = { registerUser };
