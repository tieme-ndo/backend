const { models } = require("../../models");
const { createError, GENERIC_ERROR } = require("../../helpers/error.js");

/**
 * @description Get VhangeRequests
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const approveChangeRequest = async (req, res, next) => {
  try {
    const changeRequestEntry = await models.ChangeRequest.findOne({ _id: req.params.id });
    if (changeRequestEntry) {
      const convertedObject = convertToDotNotationObject(changeRequestEntry);
        await models.Farmer.findOneAndUpdate(
          { _id: farmerId },
          convertedObject,
          { new: true, runValidators: true }
        )
      await models.ChangeRequest.findOneAndRemove({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: "ChangeRequest approved",
        editedFarmer
      });
    }
    return res.status(404).json({
      success: false,
      message:
        "There is no saved changeRequest with this ID, please subit a valid changeRequest-ID"
    });
  } catch (err) {
    return next(
      createError({
        message: "Internal database error",
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = approveChangeRequest;
