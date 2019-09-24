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
  let farmerId = '';
  let changeRequestId = '';

  it('Login admin user responds with 200', done => {
    chai
      .request(server)
      .post('/api/v1/user/login')
      .send(seeds.adminUserLogin)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done(err);
      });
  });

  it('Login staff user responds with 200', done => {
    chai
      .request(server)
      .post('/api/v1/user/login')
      .send(seeds.staffUserLogin)
      .end((err, res) => {
        staffToken = res.body.token;
        res.should.have.status(200);
        done(err);
      });
  });

  it('It creates a changeRequest if farmer is updated by staff', async () => {
    const updateInput = {
      personalInfo: {
        first_name: 'Abby',
        middle_name: '',
        sur
      },
      farmInfo: {
        number_of_acres: 4
      }
    };
    const farmer = await models.Farmer.findOne().select('_id');
    farmerId = farmer._id;
    chai
      .request(server)
      .patch(`/api/v1/farmers/${farmerId}/update`)
      .set('Authorization', staffToken)
      .send(updateInput)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal(
          'Your change was created and is ready for admin approval'
        );
      });
  });

  it('It retrieves a list of change requests', done => {
    chai
      .request(server)
      .get('/api/v1/change-requests/')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('ChangeRequests found');
        res.body.changeRequests.should.be.a('array');
        done(err);
      });
  });

  it('It retrieves a change request info', async () => {
    const changeReq = await models.ChangeRequest.findOne().select('_id');
    changeRequestId = changeReq._id;
    chai
      .request(server)
      .get(`/api/v1/change-requests/${changeRequestId}`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('ChangeRequest with this ID found');
        res.body.requested_changes.should.be.a('object');
      });
  });

  it('It rejects a change', async () => {
    const changeReq = await models.ChangeRequest.findOne().select('_id');
    changeRequestId = changeReq._id;
    chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/decline`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('ChangeRequest declined');
      });
  });

  it('It accepts a change', async () => {
    const changeReq = await models.ChangeRequest.findOne().select('_id');
    changeRequestId = changeReq._id;
    chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/approve`)
      .set('Authorization', token)
      .end((err, res) => {
        console.log(res.body.message);
        res.should.have.status(200);
        res.body.message.should.equal('ChangeRequest approved');
      });
  });

  it('It does not accept an update of an archived farmer details', async () => {
    // get farmer
    const farmer = await models.Farmer.findOne().select('_id');
    farmerId = farmer._id;
    // archive him
    await models.Farmer.findOneAndUpdate(
      { _id: farmerId },
      { archived: true },
      { new: true, runValidators: true }
    );

    const changeReq = await models.ChangeRequest.findOne().select('_id');
    changeRequestId = changeReq._id;
    chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/approve`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.equal(
          'This Farmer is archived and can not be updated'
        );
      });
  });
});
