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


module.exports = router;