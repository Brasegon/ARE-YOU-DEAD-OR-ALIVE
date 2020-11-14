const { exit } = require('process');

module.exports = (function () {
    "use strict";
    
    const TLE = require( 'tle' );
    const fs = require('fs');
    const satellite = require('satellite.js');
    const { getSatelliteInfo, getMeanAnomaly, getOrbitTrack, parseTLE, getGroundTracks } = require("tle.js/dist/tlejs.cjs");

    function getOrbitType(height) {
        if (height < 2000) {
            return ("LEO (Orbite Basse)")
        } else if (height > 2000 && height < 23000) {
            return ("MEO (Orbite moyenne)")
        } else {
            return ("GEO (Orbite Géostationnaire)");
        }
    }
    function getType(name) {
        console.log(name.search("DEB"));
        if (name.search("DEB") > 0) {
            return ("Débris");
        } else if (name.search("R/B") > 0) {
            return ("Etage de fusée");
        } else {
            return ("Satellite");
        }
    }
    async function getInfo(req, res) {
        var i = 0;
        var find = false;
        var id = req.query.id;
        fs.createReadStream( './test.txt' )
        .pipe( new TLE.Parser() )
        .on( 'data', function( tle ) {
            if (id === tle.number.toString() && find === false) {
                var tles = [tle.line1, tle.line2]
                find = true;
                var info = getSatelliteInfo(tles, Date.now());
                var orbitType = getOrbitType(info.height);
                var type = getType(tle.name);
                console.log(type);
                return res.json({name:tle.name, date:tle.date, info: info, orbitType: orbitType, type: type});
            }
        })
        .on('end', function() {
            if (!find)
                return (res.json("lol"))
        });
    }

    return {
        getInfo:getInfo,
    };
}());