const router = require('express').Router();
const UserController = require('../controllers/userController');
const UserValidation = require('../middlewares/validations/users');

router.post(
  '/staff/create',
  UserValidation.addValidation,
  UserController.createUser
);

module.exports = router;
