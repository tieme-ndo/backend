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

  it('Login admin user responds with 200', done => {
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

  it('It should return 200 and an empty Array when there are no farmers in the DB as admin', done => {
    chai
      .request(server)
      .get('/api/v1/farmers')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal(
          'Could not find any farmer in the record'
        );
        res.body.totalNumberOfFarmers.should.equal(0);
        res.body.farmers.should.eql(new Array());
        res.body.farmers.should.be.a('array');
        res.body.success.should.equal(true);
        done(err);
      });
  });

  it('It should return 200 and an empty Array when there are no farmers in the DB as staff', done => {
    chai
      .request(server)
      .get('/api/v1/farmers')
      .set('Authorization', staffToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal(
          'Could not find any farmer in the record'
        );
        res.body.totalNumberOfFarmers.should.equal(0);
        res.body.farmers.should.eql(new Array());
        res.body.farmers.should.be.a('array');
        res.body.success.should.equal(true);
        done(err);
      });
  });

  it('It should return 201 when creating new farmer', done => {
    const uniqueFarmer = farmerInput;
    uniqueFarmer.personalInfo.first_name = 'createdByAdmin';
    chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', token)
      .send(uniqueFarmer)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body.farmer._id;
        done(err);
      });
  });
  

  it('It should return 201 when creating new farmer by staff user', done => {
    const uniqueFarmer = farmerInput;
    uniqueFarmer.personalInfo.first_name = 'createdByStaff';
    chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', staffToken)
      .send(uniqueFarmer)
      .end((err, res) => {
        res.should.have.status(201);
        idCreatedByStaff = res.body.farmer._id;
        done(err);
      });
  });

  it('It updates farmer details when done by admin', done => {
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

  it('It does not update farmer details if done by staff', done => {
    farmerInput.personalInfo.title = 'Mr';
    chai
      .request(server)
      .patch(`/api/v1/farmers/${idCreatedByStaff}/update`)
      .set('Authorization', staffToken)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal(
          'Your change was created and is ready for admin approval'
        );
        done(err);
      });
  });

  it('It does not update farmer details if change {} is empty', done => {
    chai
      .request(server)
      .patch(`/api/v1/farmers/${idCreatedByStaff}/update`)
      .set('Authorization', staffToken)
      .send({})
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.equal('You can not submit empty updates');
        done(err);
      });
  });

  it('It should return a single farmer', done => {
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

  it('It deletes farmer details', done => {
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

  it('It does not update archived farmer details when done by admin', done => {
    farmerInput.personalInfo.title = 'Chief';
    chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', token)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.equal(
          'This Farmer is archived and can not be updated'
        );
        done(err);
      });
  });

  it('It does not update archived farmer details if done by staff', done => {
    farmerInput.personalInfo.title = 'Chief';

    chai
      .request(server)
      .patch(`/api/v1/farmers/${idCreatedByStaff}/update`)
      .set('Authorization', staffToken)
      .send(farmerInput)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.equal(
          'This Farmer is archived and can not be updated'
        );
        done(err);
      });
  });

  it('It should return 404 if there are is no famrme with the id in the db', done => {
    chai
      .request(server)
      .get(`/api/v1/farmers/${idCreatedByStaff}`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  });

  it('It should return 201. Duplicate of test at line 40. Need farmer for next test', done => {
    const uniqueFarmer = farmerInput;
    uniqueFarmer.personalInfo.first_name = 'createdByAdmin2';

    chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', token)
      .send(uniqueFarmer)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body.farmer._id;
        done(err);
      });
  });

  it('It should return 409', done => {
    const uniqueFarmer = farmerInput;
    uniqueFarmer.personalInfo.first_name = 'createdByAdmin2';
    chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', token)
      .send(uniqueFarmer)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  });

  it('It should return an array of farmers', done => {
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

  it('It should 200 on GET farmer statistics', done => {
    chai
      .request(server)
      .get('/api/v1/farmers/statistic')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });

  it('It should return num of M/F/O farmers that add up to total number of farmers', done => {
    chai
      .request(server)
      .get('/api/v1/farmers/statistic')
      .set('Authorization', token)
      .end((err, res) => {
        const {
          totalNumOfFarmers,
          totalNumOfMaleFarmers,
          totalNumOfFemaleFarmers,
          totalNumOfOtherFarmers
        } = res.body;

        totalNumOfFarmers.should.equal(
          totalNumOfMaleFarmers +
            totalNumOfFemaleFarmers +
            totalNumOfOtherFarmers
        );
        done(err);
      });
  });

  it('It should return num of <35/>35 y/o farmers that add up to total number of farmers', done => {
    chai
      .request(server)
      .get('/api/v1/farmers/statistic')
      .set('Authorization', token)
      .end((err, res) => {
        const {
          totalNumOfFarmers,
          farmersAgeGreaterThanOrEqualThirtyFive,
          farmersAgeLesserThanThirtyFive
        } = res.body;

        totalNumOfFarmers.should.equal(
          farmersAgeGreaterThanOrEqualThirtyFive +
            farmersAgeLesserThanThirtyFive
        );
        done(err);
      });
  });

  it('It should return 400 bad request and "Not a valid ID" message on bad farmer ID', done => {
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

  it('It should return 400 on failed data validation', done => {
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

  it('It should return 401 when missing token', done => {
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
