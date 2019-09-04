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
      password,
      isAdmin: true
    });
  } catch (error) {
    return error;
  }
});

describe('Farmer route', () => {
  let token = '';
  let id = '';
  it('Login user', (done) => {
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
  describe('Farmers', () => {
    it('It should return 201', (done) => {
      chai
        .request(server)
        .post('/api/v1/farmers/create')
        .set('Authorization', token)
        .send(farmerInput)
        .end((err, res) => {
          res.should.have.status(201);
          id = res.body.farmer._id;
          done(err);
        });
    });
    it('It updates farmer details', (done) => {
      farmerInput.personalInfo.title = 'Miss';
      chai
        .request(server)
        .put(`/api/v1/farmers/${id}/update`)
        .set('Authorization', token)
        .send(farmerInput)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.farmer.personalInfo.title.should.equal('Miss');
          done(err);
        });
    });
    it('It should return a single farmer', (done) => {
      chai
        .request(server)
        .get(`/api/v1/farmers/${id}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.equal('Farmer record found');
          done(err);
        });
    });
    // it('It deletes farmer details', (done) => {
    //   chai
    //     .request(server)
    //     .delete(`/api/v1/farmers/${id}/delete`)
    //     .set('Authorization', token)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.message.should.equal('Farmer details deleted successfully');
    //       done(err);
    //     });
    // });
    it('It should return an array of farmers', (done) => {
      chai
        .request(server)
        .get('/api/v1/farmers')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(404);
          done(err);
        });
    });
    it('It should return 201', (done) => {
      chai
        .request(server)
        .post('/api/v1/farmers/create')
        .set('Authorization', token)
        .send(farmerInput)
        .end((err, res) => {
          res.should.have.status(201);
          id = res.body.farmer._id;
          done(err);
        });
    });
    it('It should return an array of farmers', (done) => {
      chai
        .request(server)
        .get('/api/v1/farmers')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.equal('Farmers records found');
          done(err);
        });
    });
    it('It should return 409', (done) => {
      chai
        .request(server)
        .post('/api/v1/farmers/create')
        .set('Authorization', token)
        .send(farmerInput)
        .end((err, res) => {
          res.should.have.status(409);
          done(err);
        });
    });
    it('It should return 400 bad request', (done) => {
      chai
        .request(server)
        .put('/api/v1/farmers/hui89ewhee/update')
        .set('Authorization', token)
        .send(farmerInput)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.message.should.equal('Not a valid ID');
          done(err);
        });
    });
    it('It should return 400', (done) => {
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
    it('It should return 401', (done) => {
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
});
