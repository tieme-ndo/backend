const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const server = require('../index');
const { models, connectDB } = require('../models');

chai.should();

chai.use(chaiHttp);

before(async () => {
  try {
    const password = bcrypt.hashSync('123456', bcrypt.genSaltSync(10));
    connectDB().then(async () => {
      await Promise.all([
        models.User.deleteMany({}),
        models.Farmer.deleteMany({}),
        models.User.create({
          username: 'Moses',
          isAdmin: true,
          password
        })
      ]);
    });
  } catch (error) {
    return error;
  }
});

describe('Users route', () => {
  let token = '';
  it('Login user', done => {
    const userLogin = {
      username: 'Moses',
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
  describe('POST /user', () => {
    const validUserDetails = {
      username: 'Rexy',
      password: '1234567'
    };
    it('it should add new user account', done => {
      chai
        .request(server)
        .post('/api/v1/user/signup')
        .set('authorization', token)
        .send(validUserDetails)
        .end((err, res) => {
          res.should.have.status(201);
          done(err);
        });
    });
    it('it should return 409 ', done => {
      const alreadyExistUser = {
        username: 'Rexy',
        password: '1234567'
      };
      chai
        .request(server)
        .post('/api/v1/user/signup')
        .set('authorization', token)
        .send(alreadyExistUser)
        .end((err, res) => {
          res.should.have.status(409);
          done(err);
        });
    });
    it('it should return 400 ', done => {
      const incompleteUserDetails = {
        username: '',
        password: '1234567'
      };
      chai
        .request(server)
        .post('/api/v1/user/signup')
        .set('authorization', token)
        .send(incompleteUserDetails)
        .end((err, res) => {
          res.should.have.status(400);
          done(err);
        });
    });
  });
  it('it should return 401 ', done => {
    const newUser = {
      username: 'Pavol',
      password: '1234567'
    };
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });
});
