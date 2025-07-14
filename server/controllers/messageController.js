const Message = require('../models/messageModel');

exports.getRoomMessages = async (req, res = {}) => {
    const messages = await Message.find({room: req.params.roomId})
    .populate ('sender','username')
    .sort({createdAt: 1});
    res.json(messages);
};