const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const farmerInput = require('./farmerInput');
const seeds = require('./testsSetup');

chai.should();

chai.use(chaiHttp);

describe('Farmer route', () => {
  let token = '';
  let staffToken = '';
  let id = '';
  let idCreatedByStaff = '';
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
      .set('Authorization', token)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body.farmer._id;
        done(err);
      });
  });
  it('It should return 201 when creating new farmer by staff user', (done) => {
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
  it('It updates farmer details when done by admin', (done) => {
    farmerInput.personalInfo.title = 'Miss';
    chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', token)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.farmer.personalInfo.title.should.equal('Miss');
        done(err);
      });
  });
  it('It does not update farmer details if done by staff', (done) => {
    farmerInput.personalInfo.title = 'Mr';
    chai
      .request(server)
      .patch(`/api/v1/farmers/${idCreatedByStaff}/update`)
      .set('Authorization', staffToken)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal(
          'You are not an admin, your change was created and is ready for admin approval'
        );
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
  it('It deletes farmer details', (done) => {
    chai
      .request(server)
      .delete(`/api/v1/farmers/${id}/delete`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Farmer details deleted successfully');
      });
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
  it('It should return 404 if there are no farmers in the DB', (done) => {
    chai
      .request(server)
      .get(`/api/v1/farmers/${idCreatedByStaff}/`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  });
  it('It should return 201. Duplicate of test at line 40. Need farmer for next test', (done) => {
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
        res.body.farmers.should.be.a('array');
        res.body.message.should.equal('Farmers records found');
        done(err);
      });
  });

  it('It should return 400 bad request and "Not a valid ID" message on bad farmer ID', (done) => {
    chai
      .request(server)
      .patch('/api/v1/farmers/hui89ewhee/update')
      .set('Authorization', token)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.errors.message.should.equal('Not a valid ID');
        done(err);
      });
  });
  it('It should return 400 on failed data validation', (done) => {
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
  it('It should return 401 when missing token', (done) => {
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
