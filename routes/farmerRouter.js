const express = require('express');
const farmerController = require('../controllers/farmer');
const verifyToken = require('../middlewares/verifyToken');
const validate = require('../middlewares/Validations/farmer');

const farmerRouter = express.Router();

farmerRouter.post(
  '/farmers/create',
  verifyToken,
  validate.createFarmer,
  farmerController.addFarmer
);

farmerRouter.get('/farmers', verifyToken, farmerController.getAllFarmers);
farmerRouter.get('/farmers/:id', verifyToken, farmerController.getFarmerById);
farmerRouter.put(
  '/farmers/:id/update',
  verifyToken,
  validate.validateId,
  validate.createFarmer,
  farmerController.updateFarmer
);

module.exports = farmerRouter;
