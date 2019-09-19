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
  let idCreatedByStaff = '';
  let changeRequestId = '';

  it('Login admin user responds with 200', (done) => {
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

  it('Login staff user responds with 200', (done) => {
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

  it('It should return 201 when creating new farmer', (done) => {
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

  it('It creates a changerequest if farmer is updated by staff', (done) => {
    farmerInput.personalInfo.title = 'Mr';
    chai
      .request(server)
      .patch(`/api/v1/farmers/${idCreatedByStaff}/update`)
      .set('Authorization', staffToken)
      .send(farmerInput)
      .end(async (err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal(
          'Your change was created and is ready for admin approval'
        );
        const changeRequests = await models.ChangeRequest.find();
        chai.expect(changeRequests).to.have.lengthOf(1);
        changeRequestId = changeRequests[0]._id;
        done(err);
      });
  });

  it('It retrieves a list of change requests', (done) => {
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

  it('It retrieves a change request info', (done) => {
    chai
      .request(server)
      .get(`/api/v1/change-requests/${changeRequestId}`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('ChangeRequest with this ID found');
        res.body.requested_changes.should.be.a('object');
        done(err);
      });
  });

  it('It rejects a change', (done) => {
    chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/decline`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('ChangeRequest declined');
        done(err);
      });
  });

  it('It creates a changerequest if farmer is updated by staff. Copy of test to have a changerequest in DB', (done) => {
    farmerInput.personalInfo.title = 'Mr';
    chai
      .request(server)
      .patch(`/api/v1/farmers/${idCreatedByStaff}/update`)
      .set('Authorization', staffToken)
      .send(farmerInput)
      .end(async (err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal(
          'Your change was created and is ready for admin approval'
        );
        const changeRequests = await models.ChangeRequest.find();
        chai.expect(changeRequests).to.have.lengthOf(1);
        changeRequestId = changeRequests[0]._id;
        done(err);
      });
  });

  it('It accepts a change', (done) => {
    chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/approve`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('ChangeRequest approved');
        done(err);
      });
  });

  it('It creates a changerequest if farmer is updated by staff. Copy of test to have a changerequest in DB', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/farmers/${idCreatedByStaff}/update`)
      .set('Authorization', staffToken)
      .send({ personalInfo: { title : 'Chief' } })
      .end(async (err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal(
          'Your change was created and is ready for admin approval'
        );
        const changeRequests = await models.ChangeRequest.find();
        chai.expect(changeRequests).to.have.lengthOf(1);
        changeRequestId = changeRequests[0]._id;
        done(err);
      });
  });

  it('It sets the farmer to archived, necessary for next test', (done) => {
    chai
      .request(server)
      .delete(`/api/v1/farmers/${idCreatedByStaff}/delete`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Farmer details deleted successfully');
        done(err);
      });
  });

  it('It does not accept an update of an archived farmer details', (done) => {
    chai
      .request(server)
      .post(`/api/v1/change-requests/${changeRequestId}/approve`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.equal('This Farmer is archived and can not be updated');
        done(err);
      });
  });
});
