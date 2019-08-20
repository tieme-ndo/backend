const { User } = require('../index');
const { hashPassword } = require('../../helpers');

const user1 = {
  username: 'Moses',
  password: hashPassword('1234567')
};
const user2 = {
  username: 'Moses2',
  password: hashPassword('1234567')
};

module.exports = async () => {
  await User.create(user1);
  await User.create(user2);
};
