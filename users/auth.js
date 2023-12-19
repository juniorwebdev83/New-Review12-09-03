const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ message: 'Token verification failed', error: err.message });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  authenticateJWT,
};
