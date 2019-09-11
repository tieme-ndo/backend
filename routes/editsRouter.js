const express = require('express');
const editController = require('../controllers/edit');
const verifyToken = require('../middlewares/verifyToken');
const isAuthorized = require('../middlewares/isAuthorized');
const validate = require('../middlewares/Validations/farmer');

const editRouter = express.Router();

editRouter.get(
  '/edits',
  verifyToken,
  isAuthorized,
  editController.getAllEdits
);

editRouter.post(
  '/edits/:id/approve',
  verifyToken,
  validate.validateId,
  isAuthorized,
  editController.approveEdit
);

editRouter.get(
  '/edits/:id/decline',
  verifyToken,
  validate.validateId,
  isAuthorized,
  editController.declineEdit
);

module.exports = editRouter;
