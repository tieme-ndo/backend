const { FORBIDDEN } = require('../../helpers/error');

/**
 * Handle bad request error
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} err
 */

const forbidden = (err, req, res, next) => {
  if (err.status !== FORBIDDEN) {
    return next(err);
  }

  return res.status(FORBIDDEN).json({
    success: false,
    message: err.message || 'Forbidden',
    errors: [err]
  });
};

module.exports = forbidden;
