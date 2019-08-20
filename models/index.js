require('dotenv').config();
const mongoose = require('mongoose');
const userSchema = require('./schema/userSchema');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (err) => {
  if (err) return err;
  return console.log('Successfully connected');
});

const User = mongoose.model('Users', userSchema);

module.exports = { User };
