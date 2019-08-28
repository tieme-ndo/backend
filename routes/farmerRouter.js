const express = require('express');
const FarmerController = require('../controllers/farmer');
const verifyToken = require('../middlewares/verifyToken');
const validate = require('../middlewares/Validations/farmer');

const farmerRouter = express.Router();

farmerRouter.post(
  '/farmers/create',
  verifyToken,
  validate.createFarmer,
  FarmerController.addFarmer
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
