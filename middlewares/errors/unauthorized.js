const { UNAUTHORIZED } = require('../../helpers/error');

/**
 * Handle unauthorized error
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const unauthorized = (err, req, res, next) => {
  if (err.status !== UNAUTHORIZED) {
    return next(err);
  }

  return res.status(UNAUTHORIZED).json({
    success: false,
    message: err.message || 'Unauthorized',
    errors: [err]
  });
};

module.exports = unauthorized;
