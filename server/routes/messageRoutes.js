const express = require('express');
const router = express.Router();

const{getRoomMessages} = require('../controllers/messageController');

router.get('/rooms/:roomId/messages', getRoomMessages);
module.exports = router;