const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const seeds = require('./testsSetup');

chai.use(chaiHttp);
let token = '';

describe('Users route [/user/login]', () => {
  it('should return 200 on user log in', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/login')
      .send(seeds.adminUser)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done(err);
      });
  });

  it('should return 200 on reset user password', (done) => {
    chai
      .request(server)
      .put('/api/v1/user/reset-password')
      .set('authorization', token)
      .send(seeds.changePassword)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });

  it('should return 401 on reset user password with wrong current password', (done) => {
    chai
      .request(server)
      .put('/api/v1/user/reset-password')
      .set('authorization', token)
      .send(seeds.changePasswordFalse)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Current password is incorrect');
        done(err);
      });
  });

  it('should return 401 when no token is provided', (done) => {
    chai
      .request(server)
      .put('/api/v1/user/reset-password')
      .set('authorization', '')
      .send(seeds.newPassword)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });

  it('should return 400 bad request', (done) => {
    const newPassword = {
      password: ''
    };

    chai
      .request(server)
      .put('/api/v1/user/reset-password')
      .set('authorization', token)
      .send(newPassword)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  });
});

describe('Users route [user/signup]', () => {
  it('should return 201 on add new user', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .set('authorization', token)
      .send(seeds.staffUser2)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  });

  it('should return 409 when the user already exist', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .set('authorization', token)
      .send(seeds.staffUser2)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  });

  it('should return 400 when the user is missing username', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .set('authorization', token)
      .send(seeds.missingUsername)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  });

  it('should return 401 when user does not exist', (done) => {
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

  it('should return normalize username on add new user', (done) => {
    const capitalUsername = seeds.staffUser2;
    capitalUsername.username = 'BIGuserNAME';
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .set('authorization', token)
      .send(capitalUsername)
      .end((err, res) => {
        res.body.user.username.should.equal(
          capitalUsername.username.toLowerCase()
        );
        done(err);
      });
  });
});
