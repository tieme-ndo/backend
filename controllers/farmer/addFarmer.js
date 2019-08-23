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
