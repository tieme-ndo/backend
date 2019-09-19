const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { models, connectDB } = require('../models');
const farmerInput = require('./farmerInput');

const password = '123456';
const hashedPw = bcrypt.hashSync(password, 10);
const adminUsername = 'admin';
const staffUsername = 'staff';
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
  username: 'staff2',
  password: hashedPw
};

before((done) => {
  try {
    connectDB();
    done();
  } catch (error) {
    console.log(error);
    console.log('before ERROR');
  }
});

beforeEach(async () => {
  try {
    await models.User.deleteMany({});
    await models.Farmer.deleteMany({});
    await models.ChangeRequest.deleteMany({});

    await models.User.create(adminUser);
    await models.User.create(staffUser);
    // assign staff to farmer. this is usually done in AddFarmer controller
    farmerInput.staff = staffUsername;
    await models.Farmer.create(farmerInput);
    // needs to create changeRequest - check the request data structure
  } catch (error) {
    console.log(error);
    console.log('beforeEach ERROR');
  }
});

after((done) => {
  mongoose.connection.collections.farmers.drop(() => {
    done();
  });

  mongoose.connection.collections.users.drop(() => {
    done();
  });

  mongoose.connection.collections.changerequests.drop(() => {
    done();
  });
  mongoose.disconnect(done);
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
