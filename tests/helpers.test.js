const chai = require('chai');
const generateToken = require('../helpers/generateToken');

chai.should();


describe('create token func', () => {
  const user = {
    username: 'Tiemendo',
    isAdmin: true,
    password: '123456'
  };
  it('it should return a token', async () => {
    const token = await generateToken(user);
    token.should.be.a('string');
  });
});
