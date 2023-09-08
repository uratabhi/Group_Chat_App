const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const Authorization = require('../middleware/auth');


router.get('/', userController.getMainPage);

router.post('/signUp', userController.postUserSignUP);

router.post('/login', userController.postUserLogin);

router.post('/multimedia', Authorization.authentication, userController.postMulitmedia);




module.exports = router;