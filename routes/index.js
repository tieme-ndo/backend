const router = require('express').Router();
const user = require('./userRouter');
const farmer = require('./farmerRouter');

router.use(user);
router.use(farmer);

module.exports = router;
