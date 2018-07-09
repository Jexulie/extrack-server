var express = require('express');
var router = express.Router();
var User = require('../models/user');

var passport = require('passport');
/* Check If User Logged */
var isLogged = (req, res, next) => {

}

/* Get Expenses */
router.get('/get', isLogged, (req, res, next) => {
    if(req.body.twitter){
        User.getExpense({twitterId: req.body.id})
            .then(u => {
                res.json({action: true, expenses: u})
            })
            .catch(e => {
                res.json({action: false, error: e});
            })
    }else if(req.body.facebook){
        User.getExpense({facebookId: req.body.id})
            .then(u => {
                res.json({action: true, expenses: u})
            })
            .catch(e => {
                res.json({action: false, error: e});
            })
    }else if(req.body.google){
        User.getExpense({googleId: req.body.id})
            .then(u => {
                res.json({action: true, expenses: u})
            })
            .catch(e => {
                res.json({action: false, error: e});
            })
    }
});

/* Add Expense */
router.get('/add', isLogged, (req, res, next) => {

});

/* Log Out */
router.get('/logout', (req, res, next) => {
    req.logOut();
    res.json({ logout: true });
});

module.exports = router;