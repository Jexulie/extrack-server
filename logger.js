var winston = require('winston');
var fs = require('fs');

/**
 * Create Log Folder If Not Exists
 */
if(!fs.existsSync('./log')){
    fs.mkdirSync('./log')
}

var logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'log/error.log' , level: 'error'}),
        new winston.transports.File({ filename: 'log/combined.log' })
    ]
});


if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;