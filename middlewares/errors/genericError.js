const { GENERIC_ERROR } = require('../../helpers/error');

/**
 * Handle server error
 *
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
// eslint-disable-next-line no-unused-vars
const genericError = (err, req, res, next) =>
  res.status(GENERIC_ERROR).json({
    ok: false,
    message: err.message || 'Internal server error',
    errors: [err]
  });

module.exports = genericError;
