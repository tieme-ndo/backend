const express = require('express');
const changeRequestController = require('../controllers/changeRequest');
const verifyToken = require('../middlewares/verifyToken');
const isAuthorized = require('../middlewares/isAuthorized');
const validate = require('../middlewares/Validations/farmer');

const changeRequestRouter = express.Router();

changeRequestRouter.get(
  '/change-requests',
  verifyToken,
  isAuthorized,
  changeRequestController.getAllChangeRequests
);

changeRequestRouter.get(
  '/change-requests/:id',
  verifyToken,
  validate.validateId,
  isAuthorized,
  changeRequestController.getChangeRequestById
);

changeRequestRouter.post(
  '/change-requests/:id/approve',
  verifyToken,
  validate.validateId,
  isAuthorized,
  changeRequestController.approveChangeRequest
);

changeRequestRouter.post(
  '/change-requests/:id/decline',
  verifyToken,
  validate.validateId,
  isAuthorized,
  changeRequestController.declineChangeRequest
);

module.exports = changeRequestRouter;
