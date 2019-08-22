const bcrypt = require('bcrypt');
const { models } = require('../../models');
const { createError, CONFLICT, GENERIC_ERROR } = require('../../helpers/error');

/**
 * @description Create new user
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const register = async (req, res, next) => {
  try {
    const userDetails = req.body;

    const salt = bcrypt.genSaltSync(10);

    userDetails.password = bcrypt.hashSync(userDetails.password, salt);

    const user = await models.User.create(userDetails);

    user.password = null;

    return res.status(201).json({
      success: true,
      message: 'New user created',
      user
    });
  } catch (err) {
    if (err.message.includes('duplicate key')) {
      return next(createError({
        message: 'username already exists',
        status: CONFLICT,
      }));
    }
    return next(createError({
      message: 'Could not create new user',
      status: GENERIC_ERROR,
    }));
  }
};

module.exports = register;
