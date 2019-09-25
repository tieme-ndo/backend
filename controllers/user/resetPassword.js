/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const { models } = require('../../models');
const {
  createError,
  GENERIC_ERROR,
  UNAUTHORIZED,
  NOT_FOUND
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
    const userExist = await models.User.findOne({
      username: req.user.username
    }).lean();

    if (!userExist) {
      return next(
        createError({
          message: 'User does not exist',
          status: NOT_FOUND
        })
      );
    }

    const compare = bcrypt.compareSync(
      req.body.currentPassword,
      userExist.password
    );

    if (!compare) {
      return next(
        createError({
          message: 'Current password is incorrect',
          status: UNAUTHORIZED
        })
      );
    }

    const salt = bcrypt.genSaltSync(10);

    req.body.password = bcrypt.hashSync(req.body.password, salt);

    delete req.body.currentPassword;
    await models.User.findOneAndUpdate(
      { username: req.user.username },
      req.body
    )
      .select(['-password'])
      .lean();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    return next(
      createError({
        message: 'Could not reset password',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = resetPassword;
