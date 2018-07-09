var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
var auth = require('./auth.json');
var User = require('../models/user');
var logger = require('../logger');


passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    User.findById({
        _id: id
    }).then(user => done(null, user))
});

module.exports = passport => {
    return passport.use(new GoogleStrategy({
            clientID: auth.GoogleKey,
            clientSecret: auth.GoogleSecret,
            callbackURL: "/google/redirect"
        }, (accessToken, refreshToken, profile, done) => {
            User.findOrCreate({ googleId: profile.id })
                .then(user => {
                    if(user){
                        done(null, user)
                    }else{
                        new User({
                            googleId: profile.id,
                            fullname: profile.displayName,
                            avatar: profile._json.image.url
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