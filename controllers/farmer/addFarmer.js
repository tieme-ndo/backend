/* eslint-disable camelcase */
const { models } = require('../../models');
const { createError, GENERIC_ERROR, CONFLICT } = require('../../helpers/error');

/**
 * @description Create new farmer
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const addFarmer = async (req, res, next) => {
  try {
    const farmerDetails = req.body;
    const { username } = req.user;

    farmerDetails.staff = username;

    const { middle_name, first_name, surname } = farmerDetails.personalInfo;

    const farmerExists = await models.Farmer.findOne({
      'personalInfo.first_name': first_name,
      'personalInfo.middle_name': middle_name,
      'personalInfo.surname': surname
    });

    if (farmerExists) {
      return next(
        createError({
          message: 'Farmer record exists already',
          status: CONFLICT
        })
      );
    }

    const farmer = await models.Farmer.create(farmerDetails);

    return res.status(201).json({
      success: true,
      message: 'New farmer created',
      farmer
    });
  } catch (err) {
    return next(
      createError({
        message: 'Could not create new farmer',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = addFarmer;
