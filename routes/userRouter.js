const express = require('express');
const userController = require('../controllers/user');
const validate = require('../middlewares/Validations/user');
const verifyToken = require('../middlewares/verifyToken');
const isAuthorized = require('../middlewares/isAuthorized');

const userRouter = express.Router();

userRouter.post('/user/signup', verifyToken, isAuthorized, validate.createUser, userController.register);

userRouter.put('/user/update', verifyToken, isAuthorized, validate.createUser, userController.updateUser);

module.exports = userRouter;
