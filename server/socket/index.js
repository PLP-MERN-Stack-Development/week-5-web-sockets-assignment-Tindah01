
// //const Message = require('../models/message');
// const User = require ('../models/User');
// //const { data } = require('react-router-dom');
// const message = require('../models/message');

// module.exports = (io) => {
//     io.on("connection", (socket) => {
//         console.log("Socket Connected:", socket.id);
//         socket.on("joinRoom", async ({ username, roomId }) => {
//             const user = await User.findOneAndUpdate(
//                 {username},
//                 {socketId: socket.id, isOnline: true},
//                 {new: true}
//             );
//             socket.join(roomId);
//             io.to(roomId).emit('userJoined', { user, roomId});

//             //Typing
//             socket.on('typing', (isTyping) => {
//                 socket.to(roomId).emit('Typing', { username, isTyping });
//             });
//             socket.on('stopTyping', () => {
//                 socket.to(roomId).emit('stopTyping', { username });
//             });
//             //Message
//             socket.on("sendMessage", async (Data) => {
//                 const message = await Message.create({
//                     sender: user._id,
//                     room: roomId,
//                     content: Data
//                 });
//             const fullMessage = await message.populate ("sender", "username");
//             io.to(roomId).emit('message', fullMessage);
//         });
//         //Disconnect
//         socket.on('disconnect', async () => {
//             console.offlineUser = await User.findOneAndUpdate(
//                 { socketId: socket.id },
//                 { isOnline: false },
//                 { new: true }
//             );
//             io.emit ("userOffline", offlineUser.username);
//         });

//     });  
            
//     });
// };
const Message = require('../models/message');
const User = require('../models/User');

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket Connected:", socket.id);

        socket.on("joinRoom", async ({ username, roomId }) => {
            const user = await User.findOneAndUpdate(
                { username },
                { socketId: socket.id, isOnline: true },
                { new: true }
            );

            socket.join(roomId);
            io.to(roomId).emit('userJoined', { user, roomId });

            // Typing
            socket.on('typing', (isTyping) => {
                socket.to(roomId).emit('Typing', { username, isTyping });
            });

            socket.on('stopTyping', () => {
                socket.to(roomId).emit('stopTyping', { username });
            });

            // Message
            socket.on("sendMessage", async (Data) => {
                const message = await Message.create({
                    sender: user._id,
                    room: roomId,
                    content: Data
                });

                const fullMessage = await message.populate("sender", "username");
                io.to(roomId).emit('message', fullMessage);
            });

            // Disconnect
            socket.on('disconnect', async () => {
                const offlineUser = await User.findOneAndUpdate(
                    { socketId: socket.id },
                    { isOnline: false },
                    { new: true }
                );

                if (offlineUser) {
                    io.emit("userOffline", offlineUser.username);
                }
            });
        });
    });
};
