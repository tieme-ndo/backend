const { NOT_FOUND } = require('../../helpers/error');

/**
 * Handle resource not found error
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const notFound = (err, req, res, next) => {
  if (err.status !== NOT_FOUND) {
    return next(err);
  }

  return res.status(NOT_FOUND).json({
    success: false,
    message: err.message || 'Resource not found',
    errors: [err]
  });
};

module.exports = notFound;
