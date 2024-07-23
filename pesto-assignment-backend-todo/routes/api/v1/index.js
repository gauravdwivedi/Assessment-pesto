const { Router} = require('express');

const router =  Router();


router.use('/auth', require('./users'));
router.use('/tasks', require('./todo'));

module.exports = router;
