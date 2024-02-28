require('dotenv').config();

const express = require('express');
const router = express.Router();

const passport = require('passport');

// Routes
router.get('/', portalController.login_get);

router.get('/login', portalController.login_get);

router.get('/register', portalController.register_get);

router.post('/register', portalController.register_post);

router.post('/login', portalController.login_post);

router.get('/user/verify/:userId/:uniqueString', portalController.verify_get);

router.get('/user/password-reset', portalController.password_reset_get);

router.post('/user/password-reset', portalController.password_reset_post);

router.get('/user/password-reset/:id/:token', portalController.password_reset_verify_get);

router.post('/user/password-reset/:id/:token', portalController.password_reset_verify_post);

router.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['email', 'profile'] 
  })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { 
    successRedirect: '/auth/google/protected',
    failureRedirect: '/login' 
  })
);

router.get('/auth/google/protected', portalController.auth_google_protected_get);

router.get('/auth/google/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
