const mongoose = require('mongoose');

// Farmers Schema
const farmerSchema = mongoose.Schema({
  farmer_Name: {
    type: String,
    required: true
  },
  farmer_Location: {
    type: String,
    required: true
  },
  farmer_Phone_No: {
    type: String,
    required: true
  },
  transactions: {
    type: Array,
    required: true
  }
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
