const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
};

const createToken = async (user) => {
  const { username, isAdmin } = user;
  try {
    const token = await jwt.sign(
      { username, isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );
    return token;
  } catch (error) {
    return error;
  }
};

module.exports = { hashPassword, createToken };
