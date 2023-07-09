const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *      name: Message
 *      description: Message
 */


/**
 * @swagger
 * /message/send:
 *   post:
 *     summary: send message
 *     tags: [Message]
 *     description: send message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             sender: "sender"
 *             receiver: "receiver"
 *             message: "message"
 *     responses:
 *       200:
 *         description: The message was successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *                 message: "message sent"
 */

router.post('/send', (req, res) => {
    let sender = req.body.sender;
    let receiver = req.body.receiver;
    let message = req.body.message;
    return res.send({
        message: "message sent",
    });
});

/**
 * @swagger
 * /message/receive:
 *   get:
 *     summary: receive message
 *     tags: [Message]
 *     description: receive message
 *     parameters:
 *       - in: query
 *         name: sender_id
 *         schema:
 *           type: string
 *         required: true
 *         description: sender id
 *     responses:
 *       200:
 *         description: The message was successfully received
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get('/receive', (req, res) => {
    let sender_id = req.query.sender_id;
    return res.send([
        {
            sender_id: sender_id,
            message_id: "message_id",
            message: "received message 1",
        },
        {
            sender_id: sender_id,
            message_id: "message_id",
            message: "received message 2",
        }
    ]);
});


module.exports = router;