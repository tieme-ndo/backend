const { models } = require('../../models');
const getDiff = require('./getDiff');
const { createError, GENERIC_ERROR } = require('../../helpers/error.js');

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
        success: false,
        message: 'Could not find any edit in the record'
      });
    }

    let diffEdits = await Promise.all(
      edits.map(async edit => {
        return getDiff(edit);
      })
    );

    return res.status(200).json({
      success: true,
      message: 'Edits records found',
      edits: diffEdits
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

module.exports = getAllEdits;
