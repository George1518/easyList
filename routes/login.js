const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/users');
const userValidation = require('../controllers/auth/userValidation');

// POST /login → authenticate
router.post('/',  userValidation)

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