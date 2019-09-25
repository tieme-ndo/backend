const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('Home route', () => {
  it('Should get homepage', async () => {
    const res = await chai.request(server).get('/');
    res.should.have.status(200);
  });
});

describe('Invalid route', () => {
  it('Should return invalid route', async () => {
    const res = await chai.request(server).get('/auth//signup');
    res.should.have.status(404);
  });
});
