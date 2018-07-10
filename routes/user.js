var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* Get Expenses */
router.post('/get', (req, res, next) => {
    User.getExpense(req.body)
        .then(u => {
            res.json({action: true, expenses: u})
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