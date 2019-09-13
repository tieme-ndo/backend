const { models } = require('../../models');
const { createError, GENERIC_ERROR } = require('../../helpers/error.js');
const convertToDotNotationObject = require('../farmer/convertToDotNotationObject');

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

    
    const requestedChanges = changeRequest.requested_changes;
    const selectFilter= convertToDotNotationObject(requestedChanges);
    console.log(selectFilter);
    const toChangeFarmer = await models.Farmer.findOne({
      _id: changeRequest.farmer_id
    }, selectFilter).lean();
    console.log(toChangeFarmer);

    return res.status(200).json({
      success: true,
      message: 'ChangeRequest with this ID found',
      requestedChanges
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
