const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');


router.get('/', userController.getMainPage);

router.post('/signUp', userController.postUserSignUP);




module.exports = router;