require('dotenv-safe').config({ example: false });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectToDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

app.get('/Forms/reviewForm.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Forms', 'reviewForm.html'));
});

app.get('/Forms/registerForm.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Forms', 'registerForm.html'));
});

app.get('/Forms/loginForm.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Forms', 'loginForm.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
