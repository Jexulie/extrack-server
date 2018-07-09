var passport = require('passport');
var auth = require('./auth.json');
var User = require('../models/user');
var logger = require('../logger');

var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    return new Promise((resolve, reject) => {
        passport.use(new FacebookStrategy({
            clientID: auth.FacebookKey,
            clientSecret: auth.FacebookSecret,
            callbackURL: "http://127.0.0.1:3000/facebook/redirect"
        },
        (accessToken, refreshToken, profile) => {
            User.findOrCreate({ facebookId: profile.id })
                .then(resolve)
                .catch(e => {
                    logger.error(e);
                    reject(e);
                });
        }
        ));
    });
}