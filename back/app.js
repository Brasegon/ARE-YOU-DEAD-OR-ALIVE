const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const cors = require('cors');
const api = require('./modules/api.js');
const TLE = require( 'tle' );
    const fs = require('fs');
    const satellite = require('satellite.js');
    const { getLatLngObj } = require("tle.js/dist/tlejs.cjs")


app.use(bodyParser.json())
app.use(cors());

api.launchApi(app);

// fs.createReadStream( 'full_catalog_3le_2020-06-27.txt' )
//     .pipe( TLE.createParser() )
//     .on( 'data', function( tle ) {
//         console.log("test");
//     })
app.listen(3001, () => {
    console.log('App running at 3001');
})