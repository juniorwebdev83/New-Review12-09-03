// userController.js
const axios = require('axios');

const { email, password, city, state } = req.body;

try {
  // Make a POST request to the registration route
  await axios.post('http://localhost:3000/users/register', {
    email,
    password,
    City: city, // Updated to match the form field name
    State: state, // Updated to match the form field name
  });

  console.log('User registered successfully.');
 catch (error) {
  throw error; // Handle the error in the route



    console.log('User registered successfully.');
  } catch (error) {
    throw error; // Handle the error in the route
  }
};
