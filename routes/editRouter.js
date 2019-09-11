const express = require('express');
const editController = require('../controllers/edit');
const verifyToken = require('../middlewares/verifyToken');
const isAuthorized = require('../middlewares/isAuthorized');

const editRouter = express.Router();

editRouter.get(
  '/edits',
  verifyToken,
  isAuthorized,
  editController.getAllEdits
);
/* 
editRouter.get(
  '/edits/:id/approve',
  verifyToken,
  isAuthorized,
  editController.approveEdit
);

editRouter.get(
  '/edits/:id/decline',
  verifyToken,
  isAuthorized,
  editController.declineEdit
);
 */
module.exports = editRouter;
