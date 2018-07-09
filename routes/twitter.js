var express = require('express');
var passport = require('passport');
var router = express.Router();

require('../config/passport-twitter')(passport);


/* Auth Login. */
router.get('/', passport.authenticate('twitter'));

/* Auth Callback */
router.get('/redirect', passport.authenticate('twitter', { failureRedirect: '/authfailed' }), function(req, res, next) {
    res.json({action: true, info: req.user});
});


module.exports = router;
