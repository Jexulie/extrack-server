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

// TODO: Prevent multiple account creatation because of multiple logins from Twitch / facebook / google etc

module.exports = User;

/**
 * Get Expense From the DB
 * @param {Object} profileID 
 */
module.exports.getExpense = profileID => {
    return new Promise ((resolve, reject) => {
        User.find(profileID)
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
 * TODO: Fix this
 */
module.exports.addExpense = (profileID, newExpense) => {
    return new Promise ((resolve, reject) => {
        User.findOneAndUpdate(profileID, newExpense)
            .then(u => {
                resolve(u);
            })
            .catch(e => {
                logger.error(`${new Date().toLocaleString() - e}`);
                reject(e);
            })
    });
}