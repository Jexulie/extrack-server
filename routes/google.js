var express = require('express');
var passport = require('passport');
var router = express.Router();

require('../config/passport-google')(passport);

/* Auth Login. */
router.get('/', passport.authenticate('google' , { scope:['profile']}));

/* Auth Callback */
router.get('/redirect', passport.authenticate('google',  { failureRedirect: '/authfailed' }), function(req, res, next) {

});


module.exports = router;
