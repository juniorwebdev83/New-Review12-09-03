//userController.js//
const axios = require('axios');

const registerUser = async (email, password, city, state) => {
  try {
    // Make a POST request to the registration route
    await axios.post('http://localhost:3000/users/register', {
      email,
      password,
      confirmPassword: password, // Assuming confirmPassword is not needed here
      city,
      state,
    });

    console.log('User registered successfully.');
  } catch (error) {
    throw error; // Handle the error in the route
  }
};

module.exports = { registerUser };
