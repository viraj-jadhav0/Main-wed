const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const ADMIN_USERNAME = 'zrf';
const ADMIN_PASSWORD = 'zrfviraj';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check hardcoded admin credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return res.json({
        success: true,
        admin: { username: ADMIN_USERNAME }
      });
    }

    // Fallback to user authentication
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
