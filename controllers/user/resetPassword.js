/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const { models } = require('../../models');
const {
  createError, GENERIC_ERROR, CONFLICT, UNAUTHORIZED
} = require('../../helpers/error');

/**
 * Reset user password
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const resetPassword = async (req, res, next) => {
  try {
    const userExist = await models.User.findOne({ username: req.user.username });

    if (!userExist) {
      return next(createError({
        message: 'User does not exist',
        status: CONFLICT
      }));
    }

    const salt = bcrypt.genSaltSync(10);

    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const user = await models.User.findOneAndUpdate({ username: req.user.username }, req.body).select(['-password']);

    if (!user) {
      return next(createError({
        message: 'Please login, to reset password',
        status: UNAUTHORIZED
      }));
    }

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    return next(createError({
      message: 'Could not reset password',
      status: GENERIC_ERROR,
    }));
  }
};

module.exports = resetPassword;
