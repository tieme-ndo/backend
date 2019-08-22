const chai = require('chai');
const chaiHttp = require('cha-http');
const server = require('../index');
const { models, connectDB } = require('../models');

chai.should();

chai.use(chaiHttp);

before(async () => {
  try {
    connectDB().then(async () => {
      await Promise.all([
        mode
      ])
    })
  }
});