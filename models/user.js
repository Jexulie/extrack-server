var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('../logger');

var userSchema = new Schema({
    createdAt: {type: Date, default: new Date().toLocaleString()},
    facebookId: {type: String},
    googleId: {type: String},
    twitterId: {type: String},
    fullname: {type: String},
    avatar: {type: String},
    expenses: []
});

/*
expenses Schema
{
    name: String,
    expense: Number,
    category: String,
    date: Date,
    emailMonthly: Boolean,
    emailYearly: Boolean
}
*/

var User = mongoose.model('User', userSchema);

module.exports = User;

/**
 * Get Expense From the DB
 * @param {Object} profileID 
 * Add a param 
 */
module.exports.getExpense = something => {
    return new Promise ((resolve, reject) => {
        User.find(something)
            .then(u => {
                resolve(u);
            })
            .catch(e => {
                logger.error(`${new Date().toLocaleString() - e}`);
                reject(e);
            })
    });
}

/**
 * Add Expense To the DB
 * @param {Object} expense 
 * TODO: Fix this - Add push to array
 */
module.exports.addExpense = (something, newExpense) => {
    return new Promise ((resolve, reject) => {
        User.findOneAndUpdate(something, newExpense)
            .then(u => {
                resolve(u);
            })
            .catch(e => {
                logger.error(`${new Date().toLocaleString() - e}`);
                reject(e);
            })
    });
}