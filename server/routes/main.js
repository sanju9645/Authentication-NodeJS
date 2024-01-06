require('dotenv').config();

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Routes
router.get('/', mainController.login_get);

router.get('/login', mainController.login_get);

router.get('/register', mainController.register_get);

module.exports = router;
