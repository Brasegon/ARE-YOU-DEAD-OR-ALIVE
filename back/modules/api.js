module.exports = (function () {
    "use strict";
    
    function launchApi(app) {
        app.get("/getSatInfo", (req, res) =>{
            var sat = require('./sat.js');
            sat.getInfo(req, res);
        });
    }

    return {
        launchApi: launchApi,
    };
}());