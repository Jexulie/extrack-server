var passport = require('passport');
var auth = require('./auth.json');
var User = require('../models/user');
var logger = require('../logger');

var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
    return new Promise((resolve, reject) => {
        passport.use(new TwitterStrategy({
            consumerKey: auth.TwitterKey,
            consumerSecret: auth.TwitterSecret,
            callbackURL: "http://127.0.0.1:3000/twitter/redirect"
        },
        (token, tokensecret, profile) => {
            User.findOrCreate({ twitterId: profile.id })
                .then(resolve)
                .catch(e => {
                    logger.error(e);
                    reject(e);
                });
        }
        ));
    });
}