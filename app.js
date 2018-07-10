var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var logger = require('./logger');
var config = require('./config/auth.json');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

/**
 * Database
 */
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', s =>{
    logger.info(`${new Date().toLocaleString()} - Connected to Database.`);
});
mongoose.connection.on('error', e => {
    logger.error(`${new Date().toLocaleString() - e}`);
});
mongoose.connection.on('disconnected', d => {
    logger.info(`${new Date().toLocaleString()} - Disconnected from Database!`);
});
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.info(`${new Date().toLocaleString()} - Database connection disconnected through app termination.`);
        process.exit(0);
    });
});

/**
 * Middlewares
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
app.use('/', indexRouter);
app.use('/user', userRouter);

/**
 * For The Rest
 */
app.all('*', (req, res) => {
    res.redirect('/404');
});

module.exports = app;
