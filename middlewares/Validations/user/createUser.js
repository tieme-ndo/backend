const Joi = require('@hapi/joi');
const joiValidate = require('../../../helpers/joiValidate');

/**
 * Create user validation schema
 */
const userSchema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(20)
    .trim()
    .required(),
  password: Joi.string()
    .min(6)
    .max(40)
    .trim()
    .required(),
  isAdmin: Joi.boolean()
});

/**
 * Validate user body against defined schema
 */
const createUser = (req, res, next) => joiValidate(req, res, next, userSchema);

module.exports = createUser;
