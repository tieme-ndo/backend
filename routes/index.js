const router = require('express').Router();
const user = require('./userRouter');
const farmer = require('./farmerRouter');
const edit = require('./editRouter');

router.use(user);
router.use(farmer);
router.use(edit);

module.exports = router;
