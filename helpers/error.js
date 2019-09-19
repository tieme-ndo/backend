/**
 * Define error constants
 */
const BAD_REQUEST = 400;
const CONFLICT = 409;
const NOT_FOUND = 404;
const GENERIC_ERROR = 500;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

/**
 * Create new error
 *
 * @param {String} message
 * @param {number} status
 *
 * @returns {object} error
 */
const createError = ({ message = 'Internal server error', status = 500 }) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = {
  createError,
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  GENERIC_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
};
