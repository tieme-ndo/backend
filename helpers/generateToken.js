const jwt = require('jsonwebtoken');

/**
 * @description Generate token
 *
 * @param {*} user
 */
const generateToken = user => {
  const { username, isAdmin } = user;

  const token = jwt.sign({ username, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  return token;
};

module.exports = generateToken;
