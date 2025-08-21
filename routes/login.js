const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/users');

// POST /login → authenticate
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.session.userId = user._id;
    res.json({ msg: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET /login/status → check session
router.get('/status', (req, res) => {
  if (req.session.userId) {
    return res.json({ loggedIn: true });
  }
  res.json({ loggedIn: false });
});

// fallback → serve login.html
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

module.exports = router;