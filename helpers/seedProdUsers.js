require('dotenv').config();
const bcrypt = require('bcrypt');
const { models } = require('../models');
const { createError, CONFLICT, GENERIC_ERROR } = require('../helpers/error');

const createAdmins = async (next) => {
  /*
    check if in production env
    check if admin user for stakeholder already exists
    check if developer user for dev team already exists
    if yes, skip this step
    if no, create admin user and developer user
    */
  try {
    const pw = bcrypt.hashSync('ADMINPASSWORD', 10);
    const devPw = bcrypt.hashSync('DEVPASSWORD', 10);
    await models.User.create({
      username: 'moses',
      password: pw,
      isAdmin: true
    });

    await models.User.create({
      username: 'developer',
      password: devPw,
      isAdmin: true
    });
  } catch (err) {
    if (err.message.includes('duplicate key')) {
      return next(
        createError({
          message: 'username already exists',
          status: CONFLICT
        })
      );
    }
    return next(
      createError({
        message: 'Could not create new user',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = createAdmins;
