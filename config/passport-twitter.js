var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');
var auth = require('./auth.json');
var User = require('../models/user');
var logger = require('../logger');


passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    User.findById({_id: id}).then(user => done(null,user))
});

module.exports = passport => {
    return passport.use(new TwitterStrategy({
        consumerKey: auth.TwitterKey,
        consumerSecret: auth.TwitterSecret,
        callbackURL: "/twitter/redirect"
    }, (token, tokenSecret, profile, done) => {
        User.findOrCreate({ twitterId: profile.id })
            .then(user => {
                if(user){
                    done(null, user)
                }else{
                    new User({
                        twitterId: profile.id,
                        fullname: profile.displayName,
                        avatar: profile._json.profile_image_url
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