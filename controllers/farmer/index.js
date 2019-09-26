const addFarmer = require('./addFarmer');
const updateFarmer = require('./updateFarmer');
const deleteFarmer = require('./deleteFarmer');
const getStatistics = require('./statistics');

const { getAllFarmers, getFarmerById } = require('./getFarmers');

module.exports = {
  addFarmer,
  updateFarmer,
  getAllFarmers,
  getFarmerById,
  deleteFarmer,
  getStatistics
};
