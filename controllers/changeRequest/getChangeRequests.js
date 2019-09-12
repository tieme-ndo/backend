const { models } = require('../../models');
const getDiff = require('./getDiff');
const { createError, GENERIC_ERROR } = require('../../helpers/error.js');

/**
 * @description Get ChangeRequests
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const getAllChangeRequests = async (req, res, next) => {
  try {
    const changeRequests = await models.ChangeRequest.find();
    if (!changeRequests.length) {
      return res.status(404).json({
        success: false,
        message: 'Could not find any changeRequest in the record'
      });
    }

    let diffChangeRequests = await Promise.all(
      changeRequests.map(async changeRequest => {
        return getDiff(changeRequest);
      })
    );

    return res.status(200).json({
      success: true,
      message: 'ChangeRequests found',
      changeRequests: diffChangeRequests
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
    const changeRequest = await models.ChangeRequest.findOne({_id: req.params.id});
    if (!changeRequest) {
      return res.status(404).json({
        success: false,
        message: 'Could not find changeRequest with this ID'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'ChangeRequest with this ID found',
      changeRequest
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
}
