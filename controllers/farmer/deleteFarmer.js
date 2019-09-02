const { models } = require('../../models');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND
} = require('../../helpers/error');

/**
 * @description Delete farmer record
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const deleteFarmer = async (req, res, next) => {
  try {
    const farmerId = req.params.id;
    const { isAdmin } = req.user;

    const farmerExist = await models.Farmer.findOne({ _id: farmerId });
    if (!farmerExist) {
      return next(
        createError({
          message: 'Farmer does not exist',
          status: NOT_FOUND
        })
      );
    }
    if (isAdmin) {
      await models.Farmer.findOneAndUpdate(
        { _id: farmerId },
        { archived: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Farmer details deleted successfully'
      });
    }
    return next(
      createError({
        message: 'Not authorized to delete farmer details',
        status: NOT_FOUND
      })
    );
  } catch (err) {
    return next(
      createError({
        message: 'Could not delete farmer details',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = deleteFarmer;
