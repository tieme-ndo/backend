require('dotenv').config();
const mongoose = require('mongoose');
const schema = require('./Schemas/UserSchema');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, err => {
  if (err) return err;
  return console.log('Successfully connected');
});

const User = mongoose.model('Users', schema);

module.exports = { User, mongoose };
