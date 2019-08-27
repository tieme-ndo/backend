const addFarmer = require('./addFarmer');
const updateFarmer = require('./updateFarmer');

const { getAllFarmers, getFarmerById } = require('./getFarmers');

module.exports = {
  addFarmer,
  updateFarmer,
  getAllFarmers,
  getFarmerById
};
