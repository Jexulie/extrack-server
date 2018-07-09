var express = require('express');
var passport = require('passport');
var router = express.Router();

require('../config/passport-facebook')(passport);

/* Auth Login. */
router.get('/', passport.authenticate('facebook'));

/* Auth Callback */
router.get('/redirect',passport.authenticate('facebook', { failureRedirect: '/authfailed' }), function(req, res, next) {

});


module.exports = router;
