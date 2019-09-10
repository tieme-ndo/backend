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

const edited_farmer = {
  type: farmerSchema,
  required: true
};

const editSchema = mongoose.Schema({
  edited_by,
  date,
  edited_farmer
});

const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;
