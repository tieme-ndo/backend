const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { models, connectDB } = require('../models');
const farmerInput = require('./farmerInput');

// variables
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

// test hooks
before(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(error.name, error.message);
  }
});

beforeEach(async () => {
  try {
    await models.User.deleteMany({});
    await models.Farmer.deleteMany({});
    await models.ChangeRequest.deleteMany({});

    await models.User.create(adminUser);
    const staff = await models.User.create(staffUser);
    // assign staff to farmer. this is usually done in AddFarmer controller
    const farmer = await models.Farmer.create({
      ...farmerInput,
      staff: staffUsername
    });
    // needs to create changeRequest - check the request data structure
    await models.ChangeRequest.create({
      requested_changes: {
        personalInfo: {
          first_name: 'Joe',
          title: 'Chief'
        },
        farmInfo: {
          crops_cultivated: ['Maize', 'Millet'],
          animals_or_birds: ['cow', 'donkey']
        }
      },
      farmer_id: farmer._id,
      farmer_name: farmer.personalInfo.first_name,
      change_requested_by: staff.username,
      date: Date.now()
    });
  } catch (error) {
    console.error(error.name, error.message);
  }
});

after(async () => {
  await models.User.deleteMany({});
  await models.Farmer.deleteMany({});
  await models.ChangeRequest.deleteMany({});

  await mongoose.connection.collections.farmers.drop();
  await mongoose.connection.collections.users.drop();
  await mongoose.connection.collections.changerequests.drop();
});

// exports
module.exports = {
  staffUserCreate: staffUser,
  adminUserCreate: adminUser,
  staffUserLogin: {
    username: staffUsername,
    password
  },
  adminUserLogin: {
    username: adminUsername,
    password
  },
  staffUserLogin2: {
    username: 'staff2',
    password
  },
  missingUsernameLogin: {
    username: '',
    password
  },
  newPassword: {
    password: '1234567'
  }
};
