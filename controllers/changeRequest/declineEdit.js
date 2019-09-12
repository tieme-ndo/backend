const { models } = require('../../models');
const { createError, GENERIC_ERROR } = require('../../helpers/error.js');

/**
 * @description Get ChangeRequests
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const declinecCangeRequest = async (req, res, next) => {
  try {
    const changeRequestEntry = await models.ChangeRequest.findOneAndRemove({ _id: req.params.id });
    if (changeRequestEntry) {
        return res.status(200).json({
          success: true,
          message: 'ChangeRequest declined',
        });
    }
    return res.status(404).json({
        success: false,
        message: 'There is no saved changeRequest with this ID, please subit a valid changeRequest-ID'
    })

  } catch (err) {
    return next(
      createError({
        message: 'Internal database error',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = declineChangeRequest;