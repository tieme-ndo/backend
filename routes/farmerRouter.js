const express = require('express');
const FarmerController = require('../controllers/farmer');

const farmerRouter = express.Router();

farmerRouter.post('/farmers/create', FarmerController.addFarmer);

module.exports = farmerRouter;
