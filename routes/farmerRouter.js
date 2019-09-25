const express = require('express');
const FarmerController = require('../controllers/farmer');
const verifyToken = require('../middlewares/verifyToken');
const validate = require('../middlewares/Validations/farmer');

const farmerRouter = express.Router();

farmerRouter.get(
  '/farmers/statistic',
  verifyToken,
  FarmerController.statistics
);

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

farmerRouter.patch(
  '/farmers/:id/update',
  verifyToken,
  validate.validateId,
  validate.changeRequest,
  FarmerController.updateFarmer
);

farmerRouter.delete(
  '/farmers/:id/delete',
  verifyToken,
  validate.validateId,
  FarmerController.deleteFarmer
);

module.exports = farmerRouter;
