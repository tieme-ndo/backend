const { models } = require('../../models');
const { createError, GENERIC_ERROR } = require('../../helpers/error');

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

    const farmerExists = await models.Farmer.findOne({
      firstname: farmerDetails.firstname,
      lastname: farmerDetails.lastname,
      surname: farmerDetails.surname
    });

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
