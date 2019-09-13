const { models } = require('../../models');
const { createError, GENERIC_ERROR } = require('../../helpers/error.js');
const createChangeObject = require('./createChangeObject')

/**
 * @description Get ChangeRequests
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const getAllChangeRequests = async (req, res, next) => {
  try {
    const nonRequestedDataFields = {
      requested_changes: false
    };
    const changeRequests = await models.ChangeRequest.find(
      {},
      nonRequestedDataFields
    );
    if (!changeRequests.length) {
      return res.status(404).json({
        success: false,
        message: 'Could not find any changeRequest in the record'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'ChangeRequests found',
      changeRequests
    });
  } catch (err) {
    return next(
      createError({
        message: 'Internal database error',
        status: GENERIC_ERROR
      })
    );
  }
};

const getChangeRequestById = async (req, res, next) => {
  try {
    const changeRequest = await models.ChangeRequest.findOne({
      _id: req.params.id
    });

    if (!changeRequest) {
      return res.status(404).json({
        success: false,
        message: 'Could not find changeRequest with this ID'
      });
    }

    const toChangeFarmer = await models.Farmer.findOne({
      _id: changeRequest.farmer_id
    });
    const requestedChanges = changeRequest.requested_changes;
    const prevFarmerInfo = {
      ...toChangeFarmer.personalInfo,
      ...toChangeFarmer.familyInfo,
      ...toChangeFarmer.guarantor,
      ...toChangeFarmer.farmInfo
    };
    const changeObject = createChangeObject(requestedChanges, prevFarmerInfo)

    return res.status(200).json({
      success: true,
      message: 'ChangeRequest with this ID found',
      changeObject
    });
  } catch (err) {
    return next(
      createError({
        message: 'Internal database error',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = {
  getAllChangeRequests,
  getChangeRequestById
};
