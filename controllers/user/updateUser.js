/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const { models } = require('../../models');
const { createError, GENERIC_ERROR } = require('../../helpers/error');

/**
 * Update user details
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateUser = async (req, res, next) => {
  try {
    const newUserDetails = req.body;

    const salt = bcrypt.genSaltSync(10);

    newUserDetails.password = bcrypt.hashSync(newUserDetails.password, salt);

    const user = await models.User.findOneAndUpdate({ username: newUserDetails.username }, newUserDetails);

    delete user.password;

    return res.status(200).json({
      success: true,
      message: 'User details updated',
      user
    });
  } catch (error) {
    return next(createError({
      message: 'Could not update user details',
      status: GENERIC_ERROR,
    }));
  }
};

module.exports = updateUser;
