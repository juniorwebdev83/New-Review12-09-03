// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'review-site',
  api_key: '943693391396375',
  api_secret: 'MgLL35GMgJetRLaKr-Qhx45tqsM',
});

console.log('Connected to Cloudinary'); // Add this line
module.exports = cloudinary;
