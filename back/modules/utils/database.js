module.exports = (function () {
    "use strict";

    const config = require("../../config.js");
    var isReady = false,
        mysql,
        mysqlPool;

    async function executeQueryAsync(query, args, forceBackend) {
        var conn, backendChoosen = "mysql";

        if (!isReady) {
            return Promise.reject("Database is not ready");
        }

        /* mysql backend is choosen by default */
        if (backendChoosen === "mysql") {
            try {
                conn = await mysqlPool.getConnection();
                const res = await conn.query(query, args);
                return (res);
              } catch (err) {
                throw err;
              } finally {
                if (conn) conn.release(); //release to pool
              }
        }
        return Promise.reject("No backend available in config");
    }

    function initMysqlAsync() {
        mysql = require('mariadb');

        mysqlPool = mysql.createPool(config.database);
        isReady = true;

        return Promise.resolve(true);
    }

    return {
        initMysql: initMysqlAsync,
        executeQueryAsync: executeQueryAsync
    };
}());