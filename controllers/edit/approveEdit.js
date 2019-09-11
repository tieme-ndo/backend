const { models } = require('../../models');
const { createError, GENERIC_ERROR } = require('../../helpers/error.js');

/**
 * @description Get Edits
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const approveEdit = async (req, res, next) => {
  try {
    const editEntry = await models.Edit.find({ _id: req.params.id });
    if (editEntry) {
      const editedFarmer = await models.Farmer.findOneAndReplace(
        { _id: req.params.id },
        { ...editEntry.edited_farmer }
      );
      return res.status(200).json({
        success: true,
        message: 'Edit approved',
        editedFarmer
      });
    }
    return res.status(404).json({
      success: false,
      message:
        'There is no saved edit with this ID, please subit a valid edit-ID'
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

module.exports = approveEdit;
