var express = require('express');
var router = express.Router();

var passport = require('passport');

/* Auth Login. */
router.get('/', function(req, res, next) {
  passport.authenticate('facebook');
});

/* Auth Callback */
router.get('/redirect', passport.authenticate('facebook'), function(req, res, next) {

});


module.exports = router;
