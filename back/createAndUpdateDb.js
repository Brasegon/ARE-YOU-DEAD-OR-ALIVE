const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const cors = require('cors');
const api = require('./modules/api.js');
const TLE = require( 'tle' );
var fs = require('fs');
var satellite = require('satellite.js');
const mongoose = require('mongoose');
const Obj = require('./modules/models/object');
const { timeStamp } = require('console');
const { TLSSocket } = require('tls');

app.use(bodyParser.json())
app.use(cors());

api.launchApi(app);
var i = 0;

mongoose.connect('mongodb+srv://admin:eMMM1yzh2KgvIccI@epitech.expdp.mongodb.net/epicosmos?retryWrites=true&w=majority')
.then(() => {
    console.log('Connection successful to MongoDB');
    fs.createReadStream( 'full_catalog_3le_2020-06-30.txt' )
    .pipe( new TLE.Parser() )
    .on( 'data', function( tle ) {
        createBDD(tle);
    })
})
.catch((error) => {
    console.log(error);
})

function createBDD(tle) {
    Obj.findOne({id_s: tle.number})
        .then(function (res){
            if (res === null) {
                var obj = new Obj({
                    name: tle.name,
                    id_s: tle.number,
                    classe: tle.class,
                    date: tle.date, 
                    line1: tle.line1,
                    line2: tle.line2,
                })
               obj.save().then(function(result) {
                    console.log("Objet " + tle.number + " vient d'être inclure");
               });
            } else {
                console.log("Objet " + tle.number + " existe déja");
            }
        });
}
