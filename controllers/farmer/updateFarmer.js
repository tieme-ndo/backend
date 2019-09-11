const { models } = require('../../models');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND
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

    const farmerExist = await models.Farmer.findOne({ _id: farmerId });
    if (!farmerExist) {
      return next(
        createError({
          message: 'Farmer does not exist',
          status: NOT_FOUND
        })
      );
    }
    if (farmerExist.staff === username || isAdmin) {
      if (isAdmin) {
        const farmer = await models.Farmer.findOneAndUpdate(
          { _id: farmerId },
          farmerDetails,
          { new: true }
        );

        return res.status(201).json({
          success: true,
          message: 'Farmer details updated successfully',
          farmer
        });
      }
      const farmerEditRequest = await models.Edit.create({
        edited_farmer: farmerDetails,
        edited_by: username
      });

      return res.status(201).json({
        success: true,
        message:
          'You are not an admin, your change was created and is ready for admin approval',
        farmerEditRequest
      });
    }
    return next(
      createError({
        message: 'Not authorized to update farmer details',
        status: NOT_FOUND
      })
    );
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
