const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('GET /', () => {
  it('it should get homepage', (done) => {
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
  it('It should return invalid route', (done) => {
    chai
      .request(server)
      .get('/auth//signup')
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  });
});
