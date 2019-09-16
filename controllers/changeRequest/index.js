const { getAllChangeRequests, getChangeRequestById } = require('./getChangeRequests');
const approveChangeRequest = require('./approveChangeRequest');
const declineChangeRequest = require('./declineChangeRequest');

module.exports = {
  getAllChangeRequests,
  getChangeRequestById,
  approveChangeRequest,
  declineChangeRequest
};
