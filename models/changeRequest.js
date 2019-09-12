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

const requested_changes = {
  type: Object,
  required: true
};

const changeRequestSchema = mongoose.Schema({
  change_requested_by,
  date,
  farmer_id,
  requested_changes
});

const ChangeRequest = mongoose.model('ChangeRequest', changeRequestSchema);

module.exports = ChangeRequest;
