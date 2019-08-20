require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Server is live');
});

app.use('*', (req, res) => {
  res.status(404).json('Invalid route');
});

module.exports = app;
