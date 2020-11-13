const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    name: {type: String, required: true},
    id_s: {type: String, required: false},
    classe: {type: String, required: true},
    date: {type: String, required: true},
    line1: {type: String, required: true},
    line2: {type: String, required: true},
});
const model= mongoose.model('Objects', objectSchema);
module.exports = model;
