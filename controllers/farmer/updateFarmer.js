const { models } = require('../../models');
const convertToDotNotationObject = require('./convertToDotNotationObject');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND
} = require("../../helpers/error");

/**
 * @description Update farmer details
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const updateFarmer = async (req, res, next) => {
  try {
    const farmerId = req.params.id;
    const farmerDetails = req.body;
    const { username, isAdmin } = req.user;

    const farmerExist = await models.Farmer.findOne({ _id: farmerId });
    if (!farmerExist) {
      return next(
        createError({
          message: "Farmer does not exist",
          status: NOT_FOUND
        })
      );
    }
    if (farmerExist.staff === username || isAdmin) {
      if (isAdmin) {
        const convertedObject = convertToDotNotationObject(farmerDetails);
        const farmer = await models.Farmer.findOneAndUpdate(
          { _id: farmerId },
          convertedObject,
          { new: true, runValidators: true }
        );

        return res.status(201).json({
          success: true,
          message: "Farmer details updated successfully",
          farmer
        });
      }
      console.log(
        `${farmerExist.personalInfo.first_name} ${farmerExist.personalInfo.surname}`
      );
      const farmerEditRequest = await models.ChangeRequest.create({
        requested_changes: farmerDetails,
        farmer_id: farmerId,
        farmer_name: `${farmerExist.personalInfo.first_name} ${farmerExist.personalInfo.surname}`,
        change_requested_by: username
      });

      return res.status(201).json({
        success: true,
        message:
          "You are not an admin, your change was created and is ready for admin approval",
        farmerEditRequest
      });
    }
    return next(
      createError({
        message: "Not authorized to update farmer details",
        status: NOT_FOUND
      })
    );
  } catch (err) {
    return next(
      createError({
        message: "Could not update farmer details",
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = updateFarmer;
