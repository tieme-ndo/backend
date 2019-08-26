const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const server = require('../index');
const { models, connectDB } = require('../models');
const farmerInput = require('./farmerInput');

chai.should();

chai.use(chaiHttp);

before(async () => {
  try {
    const password = bcrypt.hashSync('123456', bcrypt.genSaltSync(10));
    connectDB();
    await models.User.deleteMany({});
    await models.Farmer.deleteMany({});
    await models.User.create({
      username: 'James',
      password
    });
  } catch (error) {
    return error;
  }
});

describe('Farmer route', () => {
  let token = '';
  it('Login user', done => {
    const userLogin = {
      username: 'James',
      password: '123456'
    };
    chai
      .request(server)
      .post('/api/v1/user/login')
      .send(userLogin)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done(err);
      });
  });
  describe('Add new farmer', () => {
    it('It should return 201', done => {
      chai
        .request(server)
        .post('/api/v1/farmers/create')
        .set('Authorization', token)
        .send(farmerInput)
        .end((err, res) => {
          res.should.have.status(201);
          done(err);
        });
    });
    it('It should return 400', done => {
      farmerInput.personalInfo.title = 'Mrzz';
      chai
        .request(server)
        .post('/api/v1/farmers/create')
        .set('Authorization', token)
        .send(farmerInput)
        .end((err, res) => {
          res.should.have.status(400);
          done(err);
        });
    });
    it('It should return 401', done => {
      chai
        .request(server)
        .post('/api/v1/farmers/create')
        .send(farmerInput)
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(401);
          done(err);
        });
    });
  });
  it('It update farmer details', done => {
    farmerInput.personalInfo.title = 'Miss';
    chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', token)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.farmer.personalInfo.title.should.equal('Miss');
        done(err);
      });
  });
});
