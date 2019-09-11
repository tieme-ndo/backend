const { models } = require('../../models');
const { createError, GENERIC_ERROR } = require('../../helpers/error.js');

/**
 * @description Get Edits
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const declineEdit = async (req, res, next) => {
  try {
    const editEntry = await models.Edit.findOneAndRemove({ _id: req.params.id });
    if (editEntry) {
        return res.status(200).json({
          success: true,
          message: 'Edit declined',
        });
    }
    return res.status(404).json({
        success: false,
        message: 'There is no saved edit with this ID, please subit a valid edit-ID'
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

module.exports = declineEdit;