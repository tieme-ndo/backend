const router = require('express').Router();
const user = require('./user');
const farmer = require('./farmer');

router.use(user);
router.use(farmer);

module.exports = router;
