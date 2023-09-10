const MessageRepository = require('../repository/chat_repo');

const messageRepository = new MessageRepository();

class MessageController {

    insertMessage = async (data) => {
        let messageObj = {
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            sent_time: new Date(data.sent_time),
            message: data.message
        }
        let result = await messageRepository.insert(messageObj);
        return result;
    }

    getAllMessage = async (req, res) => {
        let user_id = req.body.user.id;
        let friend_id = req.params.friend_id;
        let result = await  messageRepository.getMessages(user_id, friend_id);
        // console.log(result);
        return res.status(result.code).json(result);
    }

    getChatList = async (req, res) => {
        let user_id = req.body.user.id;
        // console.log(user_id);
        let result = await  messageRepository.getChatList(user_id, false);
        
        return res.status(result.code).json(result);
    }


}

module.exports = MessageController