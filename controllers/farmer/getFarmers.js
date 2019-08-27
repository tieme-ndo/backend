const { models } = require('../../models');
const { createError, NOT_FOUND } = require('../../helpers/error.js');

/**
 * @description Get Farmers
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const getAllFarmers = async (req, res, next) => {
  try {
    const farmers = await models.Farmer.find({});

    return res.status(201).json({
      success: true,
      message: 'Farmers records found',
      farmers
    });
  } catch (err) {
    return next(
      createError({
        message: 'Farmers records not found',
        status: NOT_FOUND
      })
    );
  }
};

const getFarmerById = async (req, res, next) => {
  try {
    const farmer = await models.Farmer.findById(req.params.id);

    return res.status(201).json({
      success: true,
      message: 'Farmer record found',
      farmer
    });
  } catch (err) {
    return next(
      createError({
        message: 'Farmer record not found',
        status: NOT_FOUND
      })
    );
  }
};

module.exports = {
  getAllFarmers,
  getFarmerById
};
