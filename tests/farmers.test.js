const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const farmerInput = require('./farmerInput');
const seeds = require('./testsSetup');
const { models } = require('../models');

chai.should();

chai.use(chaiHttp);

describe('Farmer route', () => {
  let token = '';
  let staffToken = '';
  let id = '';

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

  it('It should return 200 and an empty Array when there are no farmers in the DB as admin', async () => {
    await models.Farmer.deleteMany({});
    const res = await chai
      .request(server)
      .get('/api/v1/farmers')
      .set('Authorization', token);
    res.should.have.status(200);
    res.body.message.should.equal('Could not find any farmer in the record');
    res.body.totalNumberOfFarmers.should.equal(0);
    res.body.farmers.should.eql([]);
    res.body.farmers.should.be.a('array');
    res.body.success.should.equal(true);
  });

  it('It should return 200 and an empty Array when there are no farmers in the DB as staff', async () => {
    await models.Farmer.deleteMany({});
    const res = await chai
      .request(server)
      .get('/api/v1/farmers')
      .set('Authorization', staffToken);
    res.should.have.status(200);
    res.body.message.should.equal('Could not find any farmer in the record');
    res.body.totalNumberOfFarmers.should.equal(0);
    res.body.farmers.should.eql([]);
    res.body.farmers.should.be.a('array');
    res.body.success.should.equal(true);
  });

  it('It should return 201 when creating new farmer', async () => {
    // reasign first name to make it 'unique'
    farmerInput.personalInfo.first_name = 'createdByAdmin';
    const res = await chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', token)
      .send(farmerInput);

    res.should.have.status(201);
  });

  it('It should return 201 when creating new farmer by staff user', async () => {
    // reasign first name to make it 'unique'
    farmerInput.personalInfo.first_name = 'createdByStaff';
    const res = await chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', staffToken)
      .send(farmerInput);

    res.should.have.status(201);
  });

  it('It updates farmer details when done by admin', async () => {
    const updateInput = {
      personalInfo: {
        title: 'Mrs',
        surname: 'World',
        first_name: 'Hello',
        middle_name: 'Happy'
      }
    };
    const farmer = await models.Farmer.findOne().select('_id');
    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', token)
      .send(updateInput);
    res.should.have.status(201);
    res.body.farmer.personalInfo.title.should.equal('Mrs');
    res.body.farmer.personalInfo.first_name.should.equal('Hello');
    res.body.farmer.personalInfo.surname.should.equal('World');
  });

  it('It does not update farmer details if change {} is empty', async () => {
    const farmer = await models.Farmer.findOne().select('_id');
    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', staffToken)
      .send({});
    res.should.have.status(403);
    res.body.message.should.equal('You can not submit empty updates');
  });

  it('It does not update if update would lead to duplicate, by admin', async () => {
    const updateInput = {
      personalInfo: {
        title: 'Mrs',
        surname: 'World',
        first_name: 'Hello',
        middle_name: 'Happy'
      }
    };
    const farmer = await models.Farmer.findOne();

    farmerInput.personalInfo.first_name = updateInput.personalInfo.first_name;
    farmerInput.personalInfo.middle_name = updateInput.personalInfo.middle_name;
    farmerInput.personalInfo.surname = updateInput.personalInfo.surname;
    await models.Farmer.create({ ...farmerInput, staff: 'test' });

    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', token)
      .send(updateInput);
    res.should.have.status(409);
    res.body.errors.message.should.equal(
      'This update would lead to a farmer duplicate. Please select a unique first, middle and surname combination'
    );
  });

  it('It does update if update would not lead to duplicate, by admin', async () => {
    const updateInput = {
      personalInfo: {
        title: 'Mrs',
        surname: 'World',
        first_name: 'Hello',
        middle_name: 'Happy'
      }
    };
    const farmer = await models.Farmer.findOne();

    farmerInput.personalInfo.first_name = updateInput.personalInfo.first_name;
    farmerInput.personalInfo.middle_name = '';
    farmerInput.personalInfo.surname = updateInput.personalInfo.surname;
    await models.Farmer.create({ ...farmerInput, staff: 'test' });

    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', token)
      .send(updateInput);
    res.should.have.status(201);
    res.body.message.should.equal('Farmer details updated successfully');
  });

  it('It does update if duplicate is prevented by same id, by admin', async () => {
    const updateInput = {
      personalInfo: {
        title: 'Mrs',
        surname: 'World',
        first_name: 'Hello',
        middle_name: 'Happy'
      }
    };
    const farmer = await models.Farmer.findOne();

    // Updates and saves the same farmer we later try to update with "conflicting" data.
    farmer.personalInfo.first_name = updateInput.personalInfo.first_name;
    farmer.personalInfo.middle_name = updateInput.personalInfo.middle_name;
    farmer.personalInfo.surname = updateInput.personalInfo.surname;
    await farmer.save();

    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', token)
      .send(updateInput);
    res.should.have.status(201);
    res.body.message.should.equal('Farmer details updated successfully');
  });

  it('It does not update if update would lead to duplicate, by staff', async () => {
    const updateInput = {
      personalInfo: {
        title: 'Mrs',
        surname: 'World',
        first_name: 'Hello',
        middle_name: 'Happy'
      }
    };
    const farmer = await models.Farmer.findOne();

    farmerInput.personalInfo.first_name = updateInput.personalInfo.first_name;
    farmerInput.personalInfo.middle_name = updateInput.personalInfo.middle_name;
    farmerInput.personalInfo.surname = updateInput.personalInfo.surname;
    await models.Farmer.create({ ...farmerInput, staff: 'test' });

    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', staffToken)
      .send(updateInput);
    res.should.have.status(409);
    res.body.errors.message.should.equal(
      'This update would lead to a farmer duplicate. Please select a unique first, middle and surname combination'
    );
  });

  it('It does update if update would not lead to duplicate, by staff', async () => {
    const updateInput = {
      personalInfo: {
        title: 'Mrs',
        surname: 'World',
        first_name: 'Hello',
        middle_name: 'Happy'
      }
    };
    const farmer = await models.Farmer.findOne();

    farmerInput.personalInfo.first_name = updateInput.personalInfo.first_name;
    farmerInput.personalInfo.middle_name = '';
    farmerInput.personalInfo.surname = updateInput.personalInfo.surname;
    await models.Farmer.create({ ...farmerInput, staff: 'test' });

    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', staffToken)
      .send(updateInput);
    res.should.have.status(201);
    res.body.message.should.equal(
      'Your change was created and is ready for admin approval'
    );
  });

  it('It does update if duplicate is prevented by same id, by staff', async () => {
    const updateInput = {
      personalInfo: {
        title: 'Mrs',
        surname: 'World',
        first_name: 'Hello',
        middle_name: 'Happy'
      }
    };
    const farmer = await models.Farmer.findOne();

    // Updates and saves the same farmer we later try to update with "conflicting" data.
    farmer.personalInfo.first_name = updateInput.personalInfo.first_name;
    farmer.personalInfo.middle_name = updateInput.personalInfo.middle_name;
    farmer.personalInfo.surname = updateInput.personalInfo.surname;
    await farmer.save();

    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', staffToken)
      .send(updateInput);
    res.should.have.status(201);
    res.body.message.should.equal(
      'Your change was created and is ready for admin approval'
    );
  });

  it('It should return a single farmer', async () => {
    const farmer = await models.Farmer.findOne().select('_id');
    id = farmer._id;
    const res = await chai
      .request(server)
      .get(`/api/v1/farmers/${id}`)
      .set('Authorization', token);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.message.should.equal('Farmer record found');
  });

  it('It deletes farmer details', async () => {
    const farmer = await models.Farmer.findOne().select('_id');
    id = farmer._id;
    const res = await chai
      .request(server)
      .delete(`/api/v1/farmers/${id}/delete`)
      .set('Authorization', token);
    res.should.have.status(200);
    res.body.message.should.equal('Farmer details deleted successfully');
  });

  it('It does not update archived farmer details when done by admin', async () => {
    // create archived farmer in DB
    await models.Farmer.create({
      ...farmerInput,
      archived: true,
      staff: seeds.staffUserLogin.username
    });
    farmerInput.personalInfo.title = 'Chief';
    const farmer = await models.Farmer.findOne({ archived: true }).select(
      '_id'
    );
    id = farmer._id;
    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', token)
      .send(farmerInput);
    res.should.have.status(403);
    res.body.message.should.equal(
      'This Farmer is archived and can not be updated'
    );
  });

  it('It does not update archived farmer details if done by staff', async () => {
    // create archived farmer in DB
    await models.Farmer.create({
      ...farmerInput,
      archived: true,
      staff: seeds.staffUserLogin.username
    });
    farmerInput.personalInfo.title = 'Chief';
    const farmer = await models.Farmer.findOne({ archived: true }).select(
      '_id'
    );
    id = farmer._id;

    const res = await chai
      .request(server)
      .patch(`/api/v1/farmers/${id}/update`)
      .set('Authorization', staffToken)
      .send(farmerInput);
    res.should.have.status(403);
    res.body.message.should.equal(
      'This Farmer is archived and can not be updated'
    );
  });

  it('It should return 404 if the farmer is not found in DB', async () => {
    const farmer = await models.Farmer.findOne().select('_id');
    id = farmer._id;
    await models.Farmer.deleteMany({});
    const res = await chai
      .request(server)
      .get(`/api/v1/farmers/${id}/`)
      .set('Authorization', token);
    res.should.have.status(404);
  });

  it('It should return 409 if farmer record exists already', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', token)
      .send(farmerInput);

    res.should.have.status(409);
  });

  it('It should return an array of farmers', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/farmers')
      .set('Authorization', token);

    res.should.have.status(200);
    res.body.farmers.should.be.a('array');
    res.body.message.should.equal('Farmers records found');
  });

  it('It should 200 on GET farmer statistics', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/farmers/statistic')
      .set('Authorization', token);

    res.should.have.status(200);
  });

  it('It should return num of M/F/O farmers that add up to total number of farmers', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/farmers/statistic')
      .set('Authorization', token);

    const {
      totalNumOfFarmers,
      totalNumOfMaleFarmers,
      totalNumOfFemaleFarmers,
      totalNumOfOtherFarmers
    } = res.body;

    totalNumOfFarmers.should.equal(
      totalNumOfMaleFarmers + totalNumOfFemaleFarmers + totalNumOfOtherFarmers
    );
  });

  it('It should return num of <35/>35 y/o farmers that add up to total number of farmers', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/farmers/statistic')
      .set('Authorization', token);

    const {
      totalNumOfFarmers,
      farmersAgeGreaterThanOrEqualThirtyFive,
      farmersAgeLesserThanThirtyFive
    } = res.body;

    totalNumOfFarmers.should.equal(
      farmersAgeGreaterThanOrEqualThirtyFive + farmersAgeLesserThanThirtyFive
    );
  });

  it('It should return 400 bad request and "Not a valid ID" message on bad farmer ID', async () => {
    const res = await chai
      .request(server)
      .patch('/api/v1/farmers/thisIsReallyBadId/update')
      .set('Authorization', token)
      .send(farmerInput);

    res.should.have.status(400);
    res.body.errors.message.should.equal('Not a valid ID');
  });

  it('It should return 400 on failed data validation', async () => {
    const invalidFarmer = JSON.parse(JSON.stringify(farmerInput));
    invalidFarmer.personalInfo.title = 'Mrzz';
    const res = await chai
      .request(server)
      .post('/api/v1/farmers/create')
      .set('Authorization', token)
      .send(invalidFarmer);

    res.should.have.status(400);
  });

  it('It should return 401 when missing token', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/farmers/create')
      .send(farmerInput);

    token = res.body.token;
    res.should.have.status(401);
  });
});
