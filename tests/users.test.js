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

describe('POST /user', () => {
  const validUserDetails = {
    username: 'Rexy',
    password: '1234567'
  };
  it('it should add new user account', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .send(validUserDetails)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  });
  it('it should return 409 ', (done) => {
    const alreadyExistUser = {
      username: 'Rexy',
      password: '1234567'
    };
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .send(alreadyExistUser)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  });
  it('it should return 422 ', (done) => {
    const incompleteUserDetails = {
      username: '',
      password: '1234567'
    };
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .send(incompleteUserDetails)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  });
});
