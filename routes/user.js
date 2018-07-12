var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* Fetch User */
router.post('/fetch', (req, res, next) => {
    User.fetchUser(req.body)
        .then(u => {
            console.log(u)
            res.json({success: true, user: u})
        })
        .catch(e => {
            res.json({success: false, error: e});
        })
});

/* Add Expense */
router.post('/add',  (req, res, next) => {
    User.addExpense(req.body)
        .then(u => {
            res.json({success: true})
        })
        .catch(e => {
            res.json({success: false, error: e});
        })
});

module.exports = router;