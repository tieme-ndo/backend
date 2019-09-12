const mongoose = require('mongoose');

const change_requested_by = {
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

const farmer_changes = {
  type: Object,
  required: true
};

const changeRequestSchema = mongoose.Schema({
  changeRequested_by,
  date,
  farmer_id,
  farmer_changes
});

const ChangeRequest = mongoose.model('ChangeRequest', changeRequestSchema);

module.exports = ChangeRequest;
