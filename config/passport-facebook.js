var passport = require('passport');
var auth = require('./auth.json');
var User = require('../models/user');
var logger = require('../logger');

var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

module.exports = () => {
    return passport.use(new FacebookStrategy({
            clientID: auth.FacebookKey,
            clientSecret: auth.FacebookSecret,
            callbackURL: "/facebook/redirect"
        },(accessToken, refreshToken, profile, done) => {
            User.findOne({ twitterId: profile.id })
            .then(curUser => {
                if(curUser){
                    done(null, curUser)
                }else{
                    new User({
                        facebookId: profile.id,
                        fullname: profile.displayName
                    })
                    .save()
                    .then(newUser => done(null, newUser))
                    .catch(err => done(err, null));
                }
            })
            .catch(e => {
                logger.error(`${new Date().toLocaleString() - e}`);
                done(err, null);
            });
        }
    ));
}