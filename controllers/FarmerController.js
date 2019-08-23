const { models } = require('../models');

class FarmerController {
  static async createFarmer(req, res) {
    try {
      const result = await models.Farmer.create(req.body);
      return res.status(201).json({ result });
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}

module.exports = FarmerController;
