/*global module, process*/
var config = {
    database: {
        host: 'brangers.eu',
        database: 'epicosmos',
        user: 'brangers',
        password: 'pokemon',
        timezone: 'UTC',
        connectionLimit: 10, //10 PROD - 1 DEV
        connectTimeout: 0,
        socketTimeout: 0,
        acquireTimeout: 1000000000
    },
    url: "http://127.0.0.1/jobBoard/",
    secret: "jobboard"
}
module.exports = config;