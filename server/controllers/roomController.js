const Room = require('../models/Room');

exports.getRooms = async (req,res) => {
    const rooms = await Room.find();
    res.json(rooms);
};

exports.createRoom = async (req, res) => {
    const {name} = req.body;
    try {
        const room = await Room.create({name});
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};