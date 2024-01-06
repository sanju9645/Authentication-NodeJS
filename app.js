const express = require('express');
const cors = require('cors');
const connectDB =  require('./server/config/database');
const cookieParser = require('cookie-parser');
const path = require('path');
const { errorHandler } = require('./lib/errorHandler');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');


/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

const PORT = process.env.PORT || 3000;

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
connectDB();

// Must first load the models
require('./server/models/User');

// Pass the global passport object into the configuration function
require('./server/config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());


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
app.use('/', require('./server/routes/main'));

app.use(errorHandler);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:PORT
app.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`);
});
