require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const allErrorHandler = require('./middleware/errors');
const { NOT_FOUND } = require('./helpers/error');

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(helmet());

app.get('/', (req, res) => res.status(200).json({
  success: true,
  message: 'API is alive...',
}));

// Handle invalid request
app.all('*', (req, res) => res.status(NOT_FOUND).json({
  success: false,
  message: 'Route does not exist...'
}));

app.use(allErrorHandler());

module.exports = app;
