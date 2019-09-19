require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const Sentry = require('@sentry/node');
const allErrorHandler = require('./middlewares/errors');
const { NOT_FOUND } = require('./helpers/error');
const router = require('./routes');
const { connectDB } = require('./models');

const app = express();

// Monitor unhandled errors in production/staging only
if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  Sentry.init({
    dsn: 'https://0636ca6c9d0845f498d09b83b1303970@sentry.io/1724713',
    environment: process.env.NODE_ENV
  });
}

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(helmet());
connectDB();

app.get('/', (req, res) => res.status(200).json({
  success: true,
  message: 'API is alive...'
}));

app.use('/api/v1', router);

// Handle invalid request
app.all('*', (req, res) => res.status(NOT_FOUND).json({
  success: false,
  message: 'Route does not exist...'
}));

// The Sentry error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(allErrorHandler());

module.exports = app;
