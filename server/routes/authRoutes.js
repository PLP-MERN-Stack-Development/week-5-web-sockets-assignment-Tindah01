const express = require('express');
const router = express.Router();
const { RegisterUser } = require('../controllers/authControllers');

router.post('/register', RegisterUser);
module.exports = router;