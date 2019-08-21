const Joi = require('@hapi/joi');
/**
 *
 *
 * @class UserValidation
 */
class UserValidation {
/**
 *
 *
 * @static
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @memberof UserValidation
 */
  static addValidation(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean()
    });

    Joi.validate(req.body, schema, (error) => {
      if (error) {
        const { details } = error;
        const message = details.map((detail) => detail.message).join(',');
        res.status(422).json({
          status: 422,
          message
        });
      } else {
        next();
      }
    });
  }
}

module.exports = UserValidation;
