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
    }).lean();

    if (!changeRequest) {
      return res.status(404).json({
        success: false,
        message: 'Could not find changeRequest with this ID'
      });
    }

    /*  This block of code is used to query the DB with a filter derived from the changeRequest
        to only display the data we need.
        Mongoose includes the _id anyway, so it is deleted afterwards. 
    */
    const requested_changes = changeRequest.requested_changes;
    const selectFilter = Object.keys(
      convertToDotNotationObject(requested_changes)
    );
    const original_data = await models.Farmer.findOne(
      {
        _id: changeRequest.farmer_id
      },
      selectFilter
    ).lean();
    delete original_data._id;

    const responseObject = {
      requested_changes,
      original_data,
      _id: changeRequest._id,
      farmer_name: changeRequest.farmer_name,
      change_requested_by: changeRequest.change_requested_by,
      datetime: changeRequest.date
    };

    return res.status(200).json({
      success: true,
      message: 'ChangeRequest with this ID found',
      ...responseObject
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
