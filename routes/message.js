const express = require('express');
const router = express.Router();
const MessageController = require('../controller/chat_controller');
const { authenticateToken } = require("../config/authorization.js");

const messageController = new MessageController();

/**
 * @swagger
 * tags:
 *      name: Message
 *      description: Message
 */

// GET api/message/chatlist
router.get('/chatlist', authenticateToken, messageController.getChatList);
// GET api/message/:friend_id
router.get('/:friend_id', authenticateToken, messageController.getAllMessage);


module.exports = router;