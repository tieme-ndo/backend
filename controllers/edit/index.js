const { models } = require('../../models');
const { createError, NOT_FOUND } = require('../../helpers/error.js');

/**
 * @description Get Edits
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const getAllEdits = async (req, res, next) => {
  try {
    const edits = await models.Edit.find();
    if (!edits.length) {
      return res.status(404).json({
        succes: false,
        message: 'Could not find any edit in the record'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Edits records found',
      edits
    });
  } catch (err) {
    return next(
      createError({
        message: 'Edits records not found',
        status: NOT_FOUND
      })
    );
  }
};

module.exports = {
  getAllEdits
};
