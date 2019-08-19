const app = require('./index');

const PORT = process.env.PORT || 9000;

app.listen(
  PORT,
  console.log(`App running on ${PORT}, in ${process.env.NODE_ENV}`),
);
