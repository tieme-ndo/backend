const mongoose = require('mongoose');
const farmerSchema = require('./farmer');

const edited_by = {
  type: String,
  required: true
};

const date = {
  type: Date,
  default: Date.now()
};

const farmer_id = {
  type: String,
  required: true
};

const edited_farmer = {
  type: farmerSchema,
  required: true
};

const editSchema = mongoose.Schema({
  edited_by,
  date,
  farmer_id,
  edited_farmer
});

const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;
