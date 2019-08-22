const chai = require('chai');
const { hashPassword, createToken } = require('../helpers');

chai.should();

describe('Hash password func', () => {
  it('it should return hashed passowrd', () => {
    const hashed = hashPassword('123456');
    hashed.should.be.a('string');
  });
});

describe('create token func', () => {
  const user = {
    username: 'Tiemendo',
    isAdmin: true,
    password: '123456'
  };
  it('it should return a token', async () => {
    const token = await createToken(user);
    token.should.be.a('string');
  });
});
