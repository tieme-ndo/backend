require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./user');
const { Farmer } = require('./farmer');
const ChangeRequest = require('./changeRequest');
const connectionString = require('../config/config');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connectDB = () => mongoose.connect(connectionString, { useNewUrlParser: true });

const models = { User, Farmer, ChangeRequest };

module.exports = { connectDB, models };
