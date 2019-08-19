const { User } = require('../models');

class UserController {
  static async createUser(req, res) {
    try {
      const result = await User.create(req.body);
      return res.status(201).json({ result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  }
}

module.exports = UserController;
