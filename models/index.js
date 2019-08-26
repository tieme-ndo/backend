require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./user');
const Farmer = require('./farmer');
const connectionString = require('../config/config');

mongoose.set('useCreateIndex', true);

console.log(connectionString);

const connectDB = () => mongoose.connect(connectionString, { useNewUrlParser: true });

const models = { User, Farmer };

module.exports = { connectDB, models };
