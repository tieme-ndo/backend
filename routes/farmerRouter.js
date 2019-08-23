const express = require('express');
const FarmerController = require('../controllers/farmer');
const validate = require('../middlewares/Validations/farmer');

const farmerRouter = express.Router();

farmerRouter.post(
  '/farmers/create',
  validate.createFarmer,
  FarmerController.addFarmer
);

module.exports = farmerRouter;
