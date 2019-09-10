const express = require('express');
const editController = require('../controllers/edit');
const validate = require('../middlewares/Validations/user');
const verifyToken = require('../middlewares/verifyToken');
const isAuthorized = require('../middlewares/isAuthorized');

const editRouter = express.Router();

editRouter.get(
  '/edits',
  verifyToken,
  isAuthorized,
  validate.createUser,
  editController.getAllEdits
);

module.exports = editRouter;
