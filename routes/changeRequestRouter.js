const express = require('express');
const changeRequestController = require('../controllers/changeRequest');
const verifyToken = require('../middlewares/verifyToken');
const isAuthorized = require('../middlewares/isAuthorized');
const validate = require('../middlewares/Validations/farmer');

const changeRequestRouter = express.Router();

changeRequestRouter.get(
  '/changeRequests',
  verifyToken,
  isAuthorized,
  changeRequestController.getAllChangeRequests
);

changeRequestRouter.get(
  '/changeRequests/:id',
  verifyToken,
  isAuthorized,
  changeRequestController.getChangeRequestById
);

changeRequestRouter.post(
  '/changeRequests/:id/approve',
  verifyToken,
  validate.validateId,
  isAuthorized,
  changeRequestController.approveChangeRequest
);

changeRequestRouter.post(
  '/changeRequests/:id/decline',
  verifyToken,
  validate.validateId,
  isAuthorized,
  changeRequestController.declineChangeRequest
);

module.exports = changeRequestRouter;
