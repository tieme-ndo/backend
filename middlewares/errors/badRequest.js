const { BAD_REQUEST } = require('../../helpers/error');

const badRequest = (err, req, res, next) => {
  if (err.status !== BAD_REQUEST) {
    return next(err);
  }

  // Handle invalid JSON body
  if (err.type && err.type.includes('entity.parse.failed')) {
    return res.status(BAD_REQUEST).json({
      success: false,
      errors: [
        {
          message: 'Invalid JSON object check request body',
          body: err.body
        }
      ]
    });
  }

  return res.status(BAD_REQUEST).json({
    success: false,
    errors: {
      message: err.message || 'Bad Request',
      status: err.status
    }
  });
};

module.exports = badRequest;
