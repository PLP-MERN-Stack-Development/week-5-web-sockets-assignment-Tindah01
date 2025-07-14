const express = require('express');
const router = express.Router();
const { getRooms, createRoom } = require('../controllers/roomController');

router.get('/rooms', getRooms);
router.post('/rooms', createRoom);

module.exports = router;