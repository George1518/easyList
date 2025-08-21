// routes/logout.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    // Clear cookie also
    res.clearCookie('connect.sid');
    res.json({ msg: 'Logged out successfully' });
  });
});

module.exports = router;