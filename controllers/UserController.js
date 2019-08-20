const { models } = require('../models');
const { hashPassword } = require('../helpers');

class UserController {
  static async createUser(req, res) {
    try {
      const password = await hashPassword(req.body.password);
      req.body.password = password;
      const result = await models.User.create(req.body);
      return res.status(201).json({ result });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'username exists already' });
      }
      return res.status(500).json({ err });
    }
  }
}

module.exports = UserController;
