const jwt = require('jsonwebtoken');
const { createError, UNAUTHORIZED } = require('../helpers/error');

/**
 * @description verifies token
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @returns String
 */
const verifyToken = async (req, res, next) => {
  const token = req.get('Authorization');

  try {
    if (!token) {
      return next(
        createError({
          message: 'No token provided, must be set on the Authorization Header',
          status: UNAUTHORIZED
        })
      );
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    return next(
      createError({
        message: 'Unable to verify token, Pls provide a valid token',
        status: UNAUTHORIZED
      })
    );
  }
};

module.exports = verifyToken;
