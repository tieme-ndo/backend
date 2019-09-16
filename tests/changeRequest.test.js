const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const farmerInput = require('./farmerInput');
const seeds = require('./testsSetup');
const { models } = require('../models');

chai.should();

chai.use(chaiHttp);

describe('Request change route', () => {
  let token = '';
  let staffToken = '';
  let id = '';
  let idCreatedByStaff = '';

  it('Login staff user responds with 200', done => {
    chai
      .request(server)
      .post('/api/v1/user/login')
      .send(seeds.staffUser)
      .end((err, res) => {
        staffToken = res.body.token;
        res.should.have.status(200);
        done(err);
      });
  });

  it('It should return 201 when creating new farmer', done => {
    chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', staffToken)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(201);
        idCreatedByStaff = res.body.farmer._id;
        done(err);
      });
  });

  it('It creates a changerequest if farmer is updated by staff', done => {
    farmerInput.personalInfo.title = 'Mr';
    chai
      .request(server)
      .patch(`/api/v1/farmers/${idCreatedByStaff}/update`)
      .set('Authorization', staffToken)
      .send(farmerInput)
      .end(async (err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal(
          'You are not an admin, your change was created and is ready for admin approval'
        );
        const changeRequests = await models.ChangeRequest.find();
        changeRequests.should.be.a('array');
        chai.expect(changeRequests).to.have.lengthOf(1);
        done(err);
      });
  });
});
