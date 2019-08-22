const router = require('express').Router();
const FarmerController = require('../controllers/FarmerController.js');

router.post('/farmer/create', FarmerController.createFarmer);

module.exports = router;
