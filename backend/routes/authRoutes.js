const express = require('express');
const { auth } = require('../utils/firebase');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const firebaseApiKey = process.env.FIREBASE_API_KEY;

// Register Route
router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    // Attempt to create the user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // Log the user record to ensure it's created
    console.log('User registered:', userRecord);

    res.status(201).json({ message: 'User registered successfully', userId: userRecord.uid });
  } catch (error) {
    // If error occurs during user creation
    console.error('Error during user creation:', error);
    res.status(400).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`, {
      email,
      password,
      returnSecureToken: true
    });

    const { idToken } = response.data;
    res.status(200).json({ message: 'User logged in successfully', token: idToken });
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
