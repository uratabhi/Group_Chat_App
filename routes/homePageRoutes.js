const express = require('express');
const router = express.Router();
const hPController = require('../controllers/homePageControl');


router.get('/', hPController.gethomePage);

module.exports = router;