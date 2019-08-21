require('dotenv').config();

const { NODE_ENV } = process.env;
let connectionString = '';

if (NODE_ENV === 'test') {
  connectionString = process.env.DB_CONNECTION_TEST;
} else {
  connectionString = process.env.DB_CONNECTION;
}

module.exports = connectionString;
