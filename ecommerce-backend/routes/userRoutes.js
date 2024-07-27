const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Apis
router.post('/login', userController.loginUser);

module.exports = router;