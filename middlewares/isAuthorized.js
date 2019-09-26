const { createError, FORBIDDEN } = require('../helpers/error');

/**
 * @description Validate if user is an admin
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAuthorized = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      createError({
        message: 'Forbidden, you do not have access!',
        status: FORBIDDEN
      })
    );
  }

  return next();
};

module.exports = isAuthorized;
