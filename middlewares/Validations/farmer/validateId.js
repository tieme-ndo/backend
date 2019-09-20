const mongoose = require('mongoose');
const { createError, BAD_REQUEST } = require('../../../helpers/error');

const validateId = (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (idValid) {
    return next();
  }
  return next(
    createError({
      message: 'Not a valid ID',
      status: BAD_REQUEST
    })
  );
};

module.exports = validateId;
