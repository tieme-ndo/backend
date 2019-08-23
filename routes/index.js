const router = require('express').Router();
const farmer = require('./farmer');

router.use(farmer);

module.exports = router;
