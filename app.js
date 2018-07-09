var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var logger = require('./logger');
var config = require('./config/auth.json');

var indexRouter = require('./routes/index');
var twitterRouter = require('./routes/twitter');
var googleRouter = require('./routes/google');
var facebookRouter = require('./routes/facebook');
var userRouter = require('./routes/user');

var app = express();

/**
 * Database
 */
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', s =>{
    logger.info(`Connected to Database,`);
});
mongoose.connection.on('error', e => {
    logger.error(e);
});
mongoose.connection.on('disconnected', d => {
    logger.info(`Disconnected from Database!`);
});
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.info(`Database connection disconnected through app termination.`);
        process.exit(0);
    });
});

/**
 * Middlewares
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// TODO: try secure true later
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/twitter', twitterRouter);
app.use('/google', googleRouter);
app.use('/facebook', facebookRouter);

module.exports = app;
