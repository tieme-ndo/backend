const { models } = require('../../models');
const convertToDotNotationObject = require('./convertToDotNotationObject');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
  FORBIDDEN,
  CONFLICT
} = require('../../helpers/error');

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
    const { middle_name, first_name, surname } = farmerDetails.personalInfo;

    const farmer = await models.Farmer.findOne({ _id: farmerId }).lean();
    if (!farmer) {
      return next(
        createError({
          message: 'Farmer does not exist',
          status: NOT_FOUND
        })
      );
    }

    if (
      farmer.personalInfo.first_name === first_name &&
      farmer.personalInfo.middle_name === middle_name &&
      farmer.personalInfo.surname === surname &&
      farmer.archived === false &&
      farmer._id !== farmerId //This prevents that the same farmer that we want to update is blocking the update
    ) {
      return next(
        createError({
          message:
            'Farmer record exists already. You need a unique name combination',
          status: CONFLICT
        })
      );
    }

    if (
      Object.keys(farmerDetails).length === 0 &&
      farmerDetails.constructor === Object
    ) {
      return next(
        createError({
          status: FORBIDDEN,
          message: 'You can not submit empty updates'
        })
      );
    }

    if (farmer.archived) {
      return next(
        createError({
          message: 'This Farmer is archived and can not be updated',
          status: FORBIDDEN
        })
      );
    }

    if (isAdmin) {
      const convertedObject = convertToDotNotationObject(farmerDetails);
      const updatedFarmer = await models.Farmer.findOneAndUpdate(
        { _id: farmerId },
        convertedObject,
        { new: true, runValidators: true }
      );

      return res.status(201).json({
        success: true,
        message: 'Farmer details updated successfully',
        farmer: updatedFarmer
      });
    }
    /* This is implemented in RC3
      if (farmer.staff === username) { */
    const farmerEditRequest = await models.ChangeRequest.create({
      requested_changes: farmerDetails,
      farmer_id: farmerId,
      farmer_name: `${farmer.personalInfo.first_name} ${farmer.personalInfo.surname}`,
      change_requested_by: username,
      date: Date.now()
    });

    return res.status(201).json({
      success: true,
      message: 'Your change was created and is ready for admin approval',
      farmerEditRequest
    });

    /* return next(
      createError({
        message: 'Not authorized to update farmer details',
        status: NOT_FOUND
      })
    ); */
  } catch (err) {
    return next(
      createError({
        message: 'Could not update farmer details',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = updateFarmer;
