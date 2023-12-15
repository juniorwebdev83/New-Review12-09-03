// userController.js
const axios = require('axios');

const registerUser = async (username, email, password) => {
  try {
    // Make a POST request to the registration route
    await axios.post('http://localhost:3000/users/register', {
      username,
      email,
      password,
    });

    console.log('User registered successfully.');
  } catch (error) {
    throw error; // Handle the error in the route
  }
};
