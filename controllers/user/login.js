const bcrypt = require('bcrypt');
const { models } = require('../../models');
const generateToken = require('../../helpers/generateToken');
const {
  createError,
  NOT_FOUND,
  GENERIC_ERROR
} = require('../../helpers/error');

/**
 * @description Create new user
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await models.User.findOne({ username });

    if (user) {
      const compare = bcrypt.compareSync(password, user.password);
      if (compare) {
        const token = await generateToken(user);
        return res.status(200).json({
          success: true,
          message: 'User is logged in',
          user,
          token
        });
      }
      return next(
        createError({
          message: 'Invalid username or password',
          status: NOT_FOUND
        })
      );
    }
    return next(
      createError({
        message: 'User does not exist',
        status: NOT_FOUND
      })
    );
  } catch (err) {
    return next(
      createError({
        message: 'Could not create new user',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = login;
