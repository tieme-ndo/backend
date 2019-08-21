const router = require('express').Router();
const UserController = require('../controllers/UserController');
const UserValidation = require('../middlewares/Validations/Users');

router.post(
  '/staff/create',
  UserValidation.addValidation,
  UserController.createUser
);

module.exports = router;
