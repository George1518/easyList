const express = require('express');
const router = express.Router();
const User = require('../models/users');

// LOGIN ROUTE (no bcrypt for now)
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // 2. Compare plain password
    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // 3. ✅ Save user ID in session
    req.session.userId = user._id;

    // 4. Send back success
    res.json({ msg: 'Login successful', userId: user._id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router