const bcrypt = require('bcrypt');
const { models, connectDB } = require('../models');

const password = '123456';
const hashedPw = bcrypt.hashSync(password, 10);
const adminUsername = 'Admin';
const staffUsername = 'Staff';
const adminUser = {
  username: adminUsername,
  password: hashedPw,
  isAdmin: true
};

before(async () => {
  try {
    await connectDB();

    await models.User.deleteMany({});
    await models.Farmer.deleteMany({});
    await models.User.create(adminUser);
  } catch (error) {
    console.log(error);
  }
});

after(async () => {
  try {
    await connectDB();

    await models.User.deleteMany({});
    await models.Farmer.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

/**
 * @TODO - create a function that will create new Farmer in DB
 * @TODO - create a function that will DELETE the farmer from DB
 * @TODO - reuse this function in farmer tests so every test is independent from each other
 */

module.exports = {
  staffUser: {
    username: staffUsername,
    password
  },
  adminUser: {
    username: adminUsername,
    password
  },
  missingUsername: {
    username: '',
    password
  },
  invalidPassword: {
    username: adminUsername,
    password: '123456'
  },
  newPassword: {
    password: '1234567'
  }
};
