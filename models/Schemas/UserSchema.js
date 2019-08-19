const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const schema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = schema;
