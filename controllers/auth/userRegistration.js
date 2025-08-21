
const User = require('../../models/users');
const bcrypt = require('bcrypt');

const userRegistration = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }
    if (username.length < 5) {
      return res.status(400).json({ msg: 'Username should contain 5 or more characters' });
    }
    if (password.length < 8) {
      return res.status(400).json({ msg: 'Password should be at least 8 characters long' });
    }

    // check if user exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ msg: 'Username already taken' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    console.log('New user registered:', username);

    res.status(201).json({ msg: 'User registered successfully', username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = userRegistration;