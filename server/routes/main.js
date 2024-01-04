require('dotenv').config();

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Routes
router.get('/', mainController.index_get);

module.exports = router;
