const mongoose = require('mongoose');

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

const farmer_changes = {
  type: Object,
  required: true
};

const editSchema = mongoose.Schema({
  edited_by,
  date,
  farmer_id,
  farmer_changes
});

const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;
