require('dotenv').config();

const express = require('express');
const router = express.Router();

// Routes

router.get('/', async (req, res) => {
  try {
    const locals = {
      title: "Login",
      description: "Node.js User Authentication",
      loginPageHeading: "Enigma Emporium",
      loginPageSubHeading: "Dance Like Nobody's Watching, Encrypt Like Everybody Is"
    }

    res.render('login', { locals });
  } catch (err) {
    console.error(process.env.INTERNAL_SERVER_ERR_NOTE + err);
  }
});

module.exports = router;
