const badRequest = require('./badRequest');
const notFound = require('./notFound');
const resourceConflict = require('./resourceConflict');
const forbidden = require('./forbidden');
const unauthorized = require('./unauthorized');
const genericError = require('./genericError');

/**
 * Package all error handlers as object
 */
const errorsObject = {
  badRequest,
  notFound,
  resourceConflict,
  forbidden,
  unauthorized,
  genericError
};

/**
 * Export all error middleware as an array
 *
 */
const allErrorHandler = () =>
  Object.keys(errorsObject).map(key => errorsObject[key]);

module.exports = allErrorHandler;
