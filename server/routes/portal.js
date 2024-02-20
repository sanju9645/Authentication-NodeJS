require('dotenv').config();

const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');

// Routes
router.get('/', portalController.login_get);

router.get('/login', portalController.login_get);

router.get('/register', portalController.register_get);

router.post('/register', portalController.register_post);

router.post('/login', portalController.login_post);

router.get('/user/verify/:userId/:uniqueString', portalController.verify_get);

module.exports = router;
