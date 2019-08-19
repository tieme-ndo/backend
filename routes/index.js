const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/staff/create', UserController.createUser);

module.exports = router;
