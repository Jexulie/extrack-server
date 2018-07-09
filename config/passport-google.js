var passport = require('passport');
var auth = require('./auth.json');
var User = require('../models/user');
var logger = require('../logger');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = () => {
    return new Promise((resolve, reject) => {
        passport.use(new GoogleStrategy({
            clientID: auth.GoogleKey,
            clientSecret: auth.GoogleSecret,
            callbackURL: "http://127.0.0.1:3000/google/redirect"
        },
        (accessToken, refreshToken, profile) => {
            User.findOrCreate({ googleId: profile.id })
                .then(resolve)
                .catch(e => {
                    logger.error(e);
                    reject(e);
                });
        }
        ));
    });
}