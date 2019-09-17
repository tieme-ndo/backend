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

const staffUser = {
  username: staffUsername,
  password: hashedPw
};

const staffUser2 = {
  username: 'Staff2',
  password: hashedPw
};

before(async () => {
  try {
    await connectDB();

    await models.User.deleteMany({});
    await models.Farmer.deleteMany({});
    await models.ChangeRequest.deleteMany({});
    await models.User.create(adminUser);
    await models.User.create(staffUser);
  } catch (error) {
    console.log(error);
  }
});

after(async () => {
  try {
    await connectDB();

    await models.User.deleteMany({});
    await models.Farmer.deleteMany({});
    await models.ChangeRequest.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  staffUser: {
    username: staffUsername,
    password
  },
  staffUser2: {
    username: staffUser2.username,
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
  newPassword: {
    password: '1234567'
  }
};
