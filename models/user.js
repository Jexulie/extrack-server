var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('../logger');

var userSchema = new Schema({
    createdAt: {type: Date, default: new Date().toLocaleString()},
    facebookID: {type: String},
    fullName: {type: String},
    email: {type:String},
    avatarUrl: {type: String},
    expenses: [],
    filterThisYear: [],
    filterThisMonth: [],
    filterLastYear: [],
    filterLastMonth: []
});

var User = mongoose.model('User', userSchema);

module.exports = User;

/**
 * Get User From the DB
 * @param {Object} userInfo
 */
module.exports.fetchUser = userInfo => {
    return new Promise ((resolve, reject) => {
        User.find({ facebookId: userInfo.id })
            .then(user => {
                if(user.length){
                    resolve(user);
                }else{
                    new User(userInfo)
                    .save()
                    .then(savedUser => resolve(savedUser))
                    .catch(e => {
                        logger.error(`${new Date().toLocaleString() - e}`);
                        reject(e);
                    })
                }
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
 */
module.exports.addExpense = userInfo => {
    return new Promise ((resolve, reject) => {
        console.log(userInfo)
        User.findOneAndUpdate({ facebookID: userInfo.facebookID }, userInfo.data)
            .then(u => {
                resolve(u);
            })
            .catch(e => {
                logger.error(`${new Date().toLocaleString() - e}`);
                reject(e);
            })
    });
}