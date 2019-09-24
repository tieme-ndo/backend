const chai = require('chai');
const generateToken = require('../helpers/generateToken');

chai.should();

describe('Helpers tests', () => {
  const user = {
    username: 'Tiemendo',
    isAdmin: true,
    password: '123456'
  };
  it('Should create a token and return it', async () => {
    const token = await generateToken(user);
    token.should.be.a('string');
  });
});
