const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');

require('./lib/siteconfig');

const errorHandler = new errorHandlerLib(constantsLib);

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
const app = express();

const PORT = process.env.PORT || 3000;

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
databaseConfig.connectDB();

// Must first load the models
require('./server/models/User');
require('./server/models/UserVerification');

// Pass the global passport object into the configuration function
require('./server/config/passport')(passport);

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 3600000,
    secure: false 
  }
}));

// This will initialize the passport object on every request
app.use(passport.initialize());

app.use(passport.session());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());

// Templating engine
app.use(expressLayout);

app.set('layout', './layouts/skeleton');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/**
 * -------------- ROUTES ----------------
 */
// app.use(require('./server/routes'));
app.use('/', require('./server/routes/portal'));

app.use((err, req, res, next) => errorHandler.handle(err, req, res, next));


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:PORT
app.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`);
});
