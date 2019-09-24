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

    const toUpdateFarmer = await models.Farmer.findOne({
      _id: farmerId
    }).lean();
    if (!toUpdateFarmer) {
      return next(
        createError({
          message: 'Farmer does not exist',
          status: NOT_FOUND
        })
      );
    }

    if (toUpdateFarmer.archived) {
      return next(
        createError({
          message: 'This Farmer is archived and can not be updated',
          status: FORBIDDEN
        })
      );
    }

    let { first_name, middle_name, surname } = '';
    if (
      farmerDetails.personalInfo.first_name !== undefined ||
      farmerDetails.personalInfo.middle_name !== undefined ||
      farmerDetails.personalInfo.surname !== undefined
    ) {
      if (farmerDetails.personalInfo.first_name !== undefined) {
        first_name = farmerDetails.personalInfo.first_name;
      } else {
        first_name = toUpdateFarmer.personalInfo.first_name;
      }
      if (farmerDetails.personalInfo.middle_name !== undefined) {
        middle_name = farmerDetails.personalInfo.middle_name;
      } else {
        middle_name = toUpdateFarmer.personalInfo.middle_name;
      }
      if (farmerDetails.personalInfo.surname !== undefined) {
        surname = farmerDetails.personalInfo.surname;
      } else {
        surname = toUpdateFarmer.personalInfo.surname;
      }

      const duplicateExists = await models.Farmer.findOne({
        'personalInfo.first_name': first_name,
        'personalInfo.middle_name': middle_name,
        'personalInfo.surname': surname,
        archived: false
      }).lean();

      if (duplicateExists) {
        if (farmerId !== duplicateExists._id.toString()) {
          return next(
            createError({
              message:
                'This update would lead to a farmer duplicate. Please select a unique first, middle and surname combination',
              status: CONFLICT
            })
          );
        }
      }
    }

    if (isAdmin) {
      const convertedObject = convertToDotNotationObject(farmerDetails);
      const updatedFarmer = await models.Farmer.findOneAndUpdate(
        { _id: farmerId },
        convertedObject,
        { new: true, runValidators: true }
      ).lean();

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
      farmer_name: `${toUpdateFarmer.personalInfo.first_name} ${toUpdateFarmer.personalInfo.surname}`,
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
