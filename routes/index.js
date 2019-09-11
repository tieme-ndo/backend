const router = require('express').Router();
const user = require('./userRouter');
const farmer = require('./farmerRouter');
const edits = require('./editsRouter');

router.use(user);
router.use(farmer);
router.use(edits);

module.exports = router;
