const { Router } = require('express');
const router = Router();

const userController = require('../../../controllers/api/v1/user_controller');


router.use('/register', userController.register);
router.use('/login', userController.login);


module.exports = router;