const Joi = require("@hapi/joi");
const joiValidate = require("../../../helpers/joiValidate");

/**
 * reset user password validation schema
 */
const passwordSchema = Joi.object({
  currentPassword: Joi.string()
    .min(6)
    .max(40)
    .trim()
    .required(),
  password: Joi.string()
    .min(6)
    .max(40)
    .trim()
    .required()
});

/**
 * Validate user password against defined schema
 */
const resetPassword = (req, res, next) =>
  joiValidate(req, res, next, passwordSchema);

module.exports = resetPassword;
