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
    .regex(/^\S+$/)
    .required()
    .error((errors) => {
      if (errors[0].type === 'string.regex.base') {
        return {
          message: 'username should not have space in between'
        };
      }
      return {
        message:
          'username is required, it must not be less than 3 and greater than 20'
      };
    }),
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
