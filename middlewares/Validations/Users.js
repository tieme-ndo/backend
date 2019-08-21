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

    Joi.validate(req.body, schema, error => {
      if (error) {
        const { details } = error;
        const message = details.map(detail => detail.message).join(',');
        res.status(422).json({
          status: 422,
          message
        });
      } else {
        req.body.username = req.body.username.replace(/\s+/g, '');
        next();
      }
    });
  }
}

module.exports = UserValidation;
