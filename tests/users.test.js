const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const { models, connectDB } = require('../models');

chai.should();

chai.use(chaiHttp);

before(async () => {
  try {
    connectDB().then(async () => {
      await Promise.all([
        models.User.deleteMany({}),
        models.Farmer.deleteMany({})
      ]);
    });
  } catch (error) {
    console.log(error);
  }
});

describe('POST /staff/create', () => {
  const newUser = {
    username: 'Rexy',
    password: '1234567'
  };
  it('it should add new user account', done => {
    chai
      .request(server)
      .post('/api/v1/staff/create')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  });
  it('it should return 409 ', done => {
    const newUser = {
      username: 'Rexy',
      password: '1234567'
    };
    chai
      .request(server)
      .post('/api/v1/staff/create')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  });
  it('it should return 422 ', done => {
    const newUser = {
      username: '',
      password: '1234567'
    };
    chai
      .request(server)
      .post('/api/v1/staff/create')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  });
});
