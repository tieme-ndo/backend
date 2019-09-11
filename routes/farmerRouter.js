const express = require('express');
const FarmerController = require('../controllers/farmer');
const verifyToken = require('../middlewares/verifyToken');
const validate = require('../middlewares/Validations/farmer');

const farmerRouter = express.Router();

farmerRouter.get('/farmers/statistic', FarmerController.statistics);

farmerRouter.post(
  '/farmers/create',
  verifyToken,
  validate.createFarmer,
  FarmerController.addFarmer
);

farmerRouter.get('/farmers', verifyToken, FarmerController.getAllFarmers);

farmerRouter.get(
  '/farmers/:id',
  verifyToken,
  validate.validateId,
  FarmerController.getFarmerById
);
farmerRouter.put(
  '/farmers/:id/update',
  verifyToken,
  validate.validateId,
  validate.createFarmer,
  FarmerController.updateFarmer
);

farmerRouter.delete(
  '/farmers/:id/delete',
  verifyToken,
  validate.validateId,
  FarmerController.deleteFarmer
);

module.exports = farmerRouter;
