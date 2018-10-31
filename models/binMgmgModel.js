// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//structure of the database

var binMgmgSchema = new Schema({
    hardware_id:String,
    threshold: String,
    condition: String,
});



var binDetails = mongoose.model('binDetails', binMgmgSchema);


// make this available to our users in our Node applications
module.exports = binDetails;
