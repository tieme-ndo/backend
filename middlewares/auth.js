const jwt = require('jsonwebtoken');

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * @description verifies token
 */
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.username = decoded.username;
      req.isAdmin = decoded.isAdmin;
      return next();
    }
    return res.status(401).json({
      message: 'No token provided, must be set on the Authorization Header'
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unable to verify token, Pls provide a valid token' });
  }
};

module.exports = verifyToken;
