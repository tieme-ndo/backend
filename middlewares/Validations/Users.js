const Joi = require('joi');

class UserValidation {
  static addValidation(req, res, next) {
    const schema = Joi.object().keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    });

    Joi.validate(req.body, schema, error => {
      if (error) {
        const { details } = error;
        // const message = details.map(detail => detail.message).join(',');
        res.status(422).json({
          status: 422,
          details
        });
      } else {
        next();
      }
    });
  }
}

module.exports = UserValidation;
