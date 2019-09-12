const router = require('express').Router();
const user = require('./userRouter');
const farmer = require('./farmerRouter');
const changeRequests = require('./changeRequestsRouter');

router.use(user);
router.use(farmer);
router.use(changeRequests);

module.exports = router;
