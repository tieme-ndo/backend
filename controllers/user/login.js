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
    const userExist = await models.User.findOne({ username }).lean();

    if (userExist) {
      const compare = bcrypt.compareSync(password, userExist.password);

      const user = await models.User.findOne({ username }).select([
        '-password'
      ]).lean();
      delete user.__v

      if (compare) {
        const token = await generateToken(userExist);

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
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = login;
