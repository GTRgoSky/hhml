const log4js = require('log4js');
const path = require('path');
//path.join(__dirname, '../log')
log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: path.join(__dirname, '../log/logFile.log') },
    },
    categories: {
        default: { appenders: ['out', 'app'], level: 'debug' },
    },
});

module.exports = log4js.getLogger();
