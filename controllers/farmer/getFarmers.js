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
    const farmers = await models.Farmer.find({ archived: false });
    if (!farmers.length) {
      return res.status(404).json({
        succes: false,
        message: 'Could not find any farmer in the record'
      });
    }
    return res.status(200).json({
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
    const { id } = req.params;
    const farmer = await models.Farmer.findOne({ _id: id, archived: false });
    if (farmer) {
      return res.status(200).json({
        success: true,
        message: 'Farmer record found',
        farmer
      });
    }
    return res.status(404).json({
      succes: false,
      message: `Cannot find farmer with ${id}`
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
