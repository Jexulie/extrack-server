var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* Fetch User */
router.post('/fetch', (req, res, next) => {
    // console.log(req.body)
    User.fetchUser(req.body)
        .then(u => {
            res.json({action: true, user: u})
        })
        .catch(e => {
            res.json({action: false, error: e});
        })
});

/* Add Expense */
router.post('/add',  (req, res, next) => {
    User.addExpense(req.body)
        .then(u => {
            res.json({action: true, added: true})
        })
        .catch(e => {
            res.json({action: false, added: false, error: e});
        })
});

module.exports = router;