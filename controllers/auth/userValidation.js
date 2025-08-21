// userValidation.js
const User = require('../../models/users');
const bcrypt = require('bcrypt');

async function userValidation(req, res) {
  try {
    const { username, password } = req.body;

    // find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // compare given password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // you’re using sessions:
    req.session.userId = user._id;

    // ✅ send response here
    res.json({ msg: `Login successful ${user.username} `});
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = userValidation;
