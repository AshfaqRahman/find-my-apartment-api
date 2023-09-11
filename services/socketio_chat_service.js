const { Server } = require("socket.io");
const MessageController = require("../controller/chat_controller");

const messageController = new MessageController();
function messageSocket(server){
    console.log("starting socketio server...");
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    const userIdSocketMap = {}; // userid, socket
    const socketUserIdMap = {}; // 


    // event names -------------------------------------------
    const SEND_MESSAGE = 'send-message';
    const RECEIVE_MESSAGE = 'receive-message';
    const USER_REGISTER = 'register-user';
    const DISCONNECT = "disconnect"; 
    // --------------------------------------------------------

    const userConnectedToServerEvent = 'user-connected-to-server';

    io.on('connection', function (socket) {
        console.log(`Connected successfully ${socket.id}`);

        socket.on(USER_REGISTER, function (userId) {
            console.log(USER_REGISTER, "-> user resgistered", userId)
            if (socketUserIdMap[socket.id] !== undefined) {
                const userId = socketUserIdMap[socket.id];
                delete socketUserIdMap[socket.id];
                delete userIdSocketMap[userId];
            }

            if (userIdSocketMap[userId] === undefined) {
                userIdSocketMap[userId] = socket.id;
                socketUserIdMap[socket.id] = userId;
                console.log(userId, "started listenting", "at socket id", socket.id);
            }
            console.log("total connected users count", Object.keys(userIdSocketMap).length);
        });

        socket.on(DISCONNECT, function () {
            console.log(`Disconnected successfully`, socket.id);
            const userId = socketUserIdMap[socket.id];
            delete socketUserIdMap[socket.id];
            if(userId !== undefined){
                console.log("deleting user", userId, "from userIdSocketMap");
                delete userIdSocketMap[userId];
                console.log("total connected users count", Object.keys(userIdSocketMap).length, "\n");
            }
        });

        socket.on(SEND_MESSAGE, async function (data) {
            console.log(`received message:`, data);
            await messageController.insertMessage(data);
            //onlineUsersScoketMap[senderId] = socket.id;
            if (data.receiver_id !== undefined) {
                const receiverSocketId = userIdSocketMap[data.receiver_id];
                const senderSocketId = userIdSocketMap[data.sender_id];
                console.log("sender:", data.sender_id, "socketId", senderSocketId);
                console.log("receiver:", data.receiver_id, "socketId", receiverSocketId);
                if (receiverSocketId !== undefined){
                    io.to(receiverSocketId).emit(RECEIVE_MESSAGE, data); //https://socket.io/docs/v3/emit-cheatsheet/
                     //https://socket.io/docs/v3/emit-cheatsheet/
                    console.log("sent message to receiver");
                }

                if(senderSocketId !== undefined){
                    io.to(senderSocketId).emit(RECEIVE_MESSAGE, data);
                    console.log("sent message to sender");
                }   
            }
        });
    });
}

module.exports = { messageSocket };