const { exit } = require('process');

module.exports = (function () {
    "use strict";
    
    const TLE = require( 'tle' );
    const fs = require('fs');
    const satellite = require('satellite.js');
    const { getSatelliteInfo, getMeanAnomaly } = require("tle.js/dist/tlejs.cjs");

    function getOrbitType(height) {
        if (height < 2000) {
            return ("LEO")
        } else if (height > 2000 && height < 23000) {
            return ("MEO")
        } else {
            return ("GEO");
        }
    }
    function getType(name) {
        if (name.search("DEB")) {
            return ("Débris");
        } else {
            return ("Satellite");
        }
    }
    function getInfo(req, res) {
        var i = 0;
        var find = false;
        var id = req.body.id;
        fs.createReadStream( './test.txt' )
        .pipe( new TLE.Parser() )
        .on( 'data', function( tle ) {
            if (id === tle.number.toString() && find === false) {
                var tles = [tle.line1, tle.line2]
                find = true;
                var info = getSatelliteInfo(tles, new Date());
                var orbitType = getOrbitType(info.height);
                var type = getType(tle.name);
                return res.json({name:tle.name, date:tle.date, info: info, orbitType: orbitType, type: type});
            }
        })
    }

    return {
        getInfo:getInfo,
    };
}());