require('dotenv').config();
const express = require('express');
const route = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Server is live');
});

app.use('/api/v1', route);

app.use('*', (req, res) => {
  res.status(404).json('Invalid Route');
});

module.exports = app;
