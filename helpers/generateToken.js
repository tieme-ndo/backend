const jwt = require('jsonwebtoken');

/**
 * @description Generate token
 *
 * @param {*} user
 */
const generateToken = async (user) => {
  const { username, isAdmin } = user;

  try {
    const token = await jwt.sign(
      { username, isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    return token;
  } catch (error) {
    return error;
  }
};

module.exports = generateToken;
