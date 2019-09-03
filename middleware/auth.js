const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there's a token
  if(!token) {
    return res.status(401).json({ msg: 'No token, authorization denied'});
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded.user;
    next()
  } catch(err) {
    res.status(401).json({ msg: 'Token is not valid, authorization denied'});
    next();
  }
};