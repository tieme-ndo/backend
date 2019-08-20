require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./user');
const Farmer = require('./farmer');

mongoose.set('useCreateIndex', true);

const connectDB = () => mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

const models = { User, Farmer };

module.exports = { connectDB, models };
