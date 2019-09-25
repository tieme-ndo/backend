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

  it('Login admin user responds with 200', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/user/login')
      .send(seeds.adminUserLogin);

    token = res.body.token;
    res.should.have.status(200);
  });

  it('Login staff user responds with 200', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/user/login')
      .send(seeds.staffUserLogin);

    staffToken = res.body.token;
    res.should.have.status(200);
  });

  it('It creates a changeRequest if farmer is updated by staff', async () => {
    const updateInput = {
      personalInfo: {
        title: 'Mr',
        surname: 'World',
        first_name: 'Hello',
        middle_name: 'Sunny'
      }
    };
    const farmer = await models.Farmer.findOne().select('_id');
    farmerId = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${farmerId}/update`)
      .set('Authorization', staffToken)
      .send(updateInput);
    res.should.have.status(201);
    res.body.message.should.equal(
      'Your change was created and is ready for admin approval'
    );
    const changeRequests = await models.ChangeRequest.find();
    chai.expect(changeRequests).to.have.lengthOf(2);
    changeRequestId = changeRequests[0]._id;
  });

  it('It retrieves a list of change requests', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/change-requests/')
      .set('Authorization', token);

    res.should.have.status(200);
    res.body.message.should.equal('ChangeRequests found');
    res.body.changeRequests.should.be.a('array');
  });

  it('It retrieves a change request info', async () => {
    const changeReq = await models.ChangeRequest.findOne().select('_id');
    changeRequestId = changeReq._id;
    const res = await chai
      .request(server)
      .get(`/api/v1/change-requests/${changeRequestId}`)
      .set('Authorization', token);
    res.should.have.status(200);
    res.body.message.should.equal('ChangeRequest with this ID found');
    res.body.requested_changes.should.be.a('object');
  });

  it('It rejects a change', async () => {
    const changeReq = await models.ChangeRequest.findOne().select('_id');
    changeRequestId = changeReq._id;
    const res = await chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/decline`)
      .set('Authorization', token);
    res.should.have.status(200);
    res.body.message.should.equal('ChangeRequest declined');
  });

  it('It accepts a change', async () => {
    const changeReq = await models.ChangeRequest.findOne().select('_id');
    changeRequestId = changeReq._id;
    const res = await chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/approve`)
      .set('Authorization', token);
    res.should.have.status(200);
    res.body.message.should.equal('ChangeRequest approved');
  });

  it('It creates change request if updated by staff', async () => {
    farmerInput.personalInfo.title = 'Mr';
    farmerInput.personalInfo.first_name = 'Sara';
    farmerInput.personalInfo.surname = 'Connor';
    const farmer = await models.Farmer.findOne().select('_id');
    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', staffToken)
      .send(farmerInput);
    res.should.have.status(201);
    res.body.message.should.equal(
      'Your change was created and is ready for admin approval'
    );
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
    const res = await chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/approve`)
      .set('Authorization', token);
    res.should.have.status(403);
    res.body.message.should.equal(
      'This Farmer is archived and can not be updated'
    );
  });
});
