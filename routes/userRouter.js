const express = require('express');
const userController = require('../controllers/user');
const validate = require('../middlewares/Validations/user');

const userRouter = express.Router();

userRouter.post('/user', validate.createUser, userController.register);

module.exports = userRouter;
