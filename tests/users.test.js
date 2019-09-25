const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const seeds = require('./testsSetup');

chai.use(chaiHttp);
let token = '';

describe('Users route', () => {
  it('Should return 200 on user log in', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/user/login')
      .send(seeds.adminUserLogin);

    token = res.body.token;
    res.should.have.status(200);
  });

  it('Should return 200 on reset user password', async () => {
    const res = await chai
      .request(server)
      .put('/api/v1/user/reset-password')
      .set('authorization', token)
      .send(seeds.changePassword);

    res.should.have.status(200);
  });

  it('should return 401 on reset user password with wrong current password', async () => {
    const res = await chai
      .request(server)
      .put('/api/v1/user/reset-password')
      .set('authorization', token)
      .send(seeds.changePasswordFalse);

    res.should.have.status(401);
    res.body.message.should.equal('Current password is incorrect');
  });

  it('should return 401 when no token is provided', async () => {
    const res = await chai
      .request(server)
      .put('/api/v1/user/reset-password')
      .set('authorization', '')
      .send(seeds.newPassword);

    res.should.have.status(401);
  });

  it('Should return 400 bad request', async () => {
    const newPassword = {
      password: ''
    };

    const res = await chai
      .request(server)
      .put('/api/v1/user/reset-password')
      .set('authorization', token)
      .send(newPassword);

    res.should.have.status(400);
  });

  it('Should return 201 on add new user', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/user/signup')
      .set('authorization', token)
      .send(seeds.staffUserLogin2);

    res.should.have.status(201);
  });

  it('Should return 409 when the user already exist', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/user/signup')
      .set('authorization', token)
      .send(seeds.staffUserLogin);

    res.should.have.status(409);
  });

  it('Should return 400 when the user is missing username', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/user/signup')
      .set('authorization', token)
      .send(seeds.missingUsernameLogin);

    res.should.have.status(400);
  });

  it('Should return 401 when token is not provided in request headers', async () => {
    const newUser = {
      username: 'Pavol',
      password: '1234567'
    };
    const res = await chai
      .request(server)
      .post('/api/v1/user/signup')
      .send(newUser);

    res.should.have.status(401);
  });

  it('Should return normalize username on add new user', async () => {
    const capitalUsername = seeds.staffUserLogin2;
    capitalUsername.username = 'BIGuserNAME';
    const res = await chai
      .request(server)
      .post('/api/v1/user/signup')
      .set('authorization', token)
      .send(capitalUsername);

    res.body.user.username.should.equal(capitalUsername.username.toLowerCase());
  });
});
