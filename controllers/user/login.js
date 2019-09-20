const bcrypt = require('bcrypt');
const { models } = require('../../models');
const generateToken = require('../../helpers/generateToken');
const {
  createError,
  NOT_FOUND,
  GENERIC_ERROR
} = require('../../helpers/error');

/**
 * @description Login user
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const login = async (req, res, next) => {
  try {
    let { username } = req.body;
    const { password } = req.body;
    username = username.toLowerCase();

    const user = await models.User.findOne({ username }).lean();
    delete user.__v;

    if (user) {
      const compare = bcrypt.compareSync(password, user.password);
      delete user.password;

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
        message: 'Internal server error',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = login;
