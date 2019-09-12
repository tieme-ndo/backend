const { getAllEdits, getEditById } = require('./getEdits');
const approveEdit = require('./approveEdit');
const declineEdit = require('./declineEdit');

module.exports = {
  getAllEdits,
  getEditById,
  approveEdit,
  declineEdit
};
