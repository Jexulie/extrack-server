var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('../logger');

var userSchema = new Schema({
    facebookId: String,
    googleId: String,
    twitterId: String,
    fullname: String,
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

module.exports.getExpense = (profileID) => {
    return new Promise ((resolve, reject) => {
        User.find(profileID)
            .then(u => {
                resolve(u);
            })
            .catch(e => {
                logger.error(e);
                reject(e);
            })
    });
}