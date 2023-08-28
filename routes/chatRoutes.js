const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatControl');
const Authorization = require('../middleware/auth');


router.post('/sendMessage', Authorization.authentication, chatController.messageStoreToDatabase);
router.get('/getMessages/:messageId', chatController.getAllChats);

module.exports = router;