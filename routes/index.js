const router = require('express').Router();
const user = require('./userRouter');
const farmer = require('./farmerRouter');
const changeRequest = require('./changeRequestRouter');

router.use(user);
router.use(farmer);
router.use(changeRequest);

module.exports = router;
