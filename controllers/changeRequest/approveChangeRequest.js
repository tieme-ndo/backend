const { models } = require('../../models');
const {
  createError, GENERIC_ERROR, FORBIDDEN, NOT_FOUND
} = require('../../helpers/error.js');
const convertToDotNotationObject = require('../farmer/convertToDotNotationObject');

/**
 * @description Get VhangeRequests
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const approveChangeRequest = async (req, res, next) => {
  try {
    const changeRequestEntry = await models.ChangeRequest.findOne({
      _id: req.params.id
    });

    if (changeRequestEntry) {
      const convertedObject = convertToDotNotationObject(
        changeRequestEntry.requested_changes
      );

      const farmer = await models.Farmer.findOne({ _id: changeRequestEntry.farmer_id }).lean();

      if (!farmer) {
        return next(
          createError({
            message: 'Farmer does not exist',
            status: NOT_FOUND
          })
        );
      }

      if (farmer.archived) {
        await models.ChangeRequest.findOneAndRemove({ _id: req.params.id });
        return next({
          message: 'This Farmer is archived and can not be updated',
          status: FORBIDDEN
        });
      }

      await models.Farmer.findOneAndUpdate(
        { _id: changeRequestEntry.farmer_id },
        convertedObject,
        { new: true, runValidators: true }
      );

      await models.ChangeRequest.findOneAndRemove({ _id: req.params.id });

      return res.status(200).json({
        success: true,
        message: 'ChangeRequest approved',
        changes: changeRequestEntry.requested_changes
      });
    }
    return res.status(404).json({
      success: false,
      message:
        'There is no saved changeRequest with this ID, please submit a valid changeRequest-ID'
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

module.exports = approveChangeRequest;
