const express = require('express');
const userController = require('../controllers/user');
const validate = require('../middlewares/Validations/user');
const verifyToken = require('../middlewares/verifyToken');

const userRouter = express.Router();

userRouter.post('/user', verifyToken, validate.createUser, userController.register);

module.exports = userRouter;
