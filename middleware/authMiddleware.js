function authMiddleware(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: 'Unauthorized' }); // stop here
    }
    next(); // only called if authorized
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ msg: "Server error in auth" });
  }
}

module.exports = authMiddleware;