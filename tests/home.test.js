const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('Home route', () => {
  it('Should get homepage', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });
});

describe('Invalid route', () => {
  it('Should return invalid route', (done) => {
    chai
      .request(server)
      .get('/auth//signup')
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  });
});
