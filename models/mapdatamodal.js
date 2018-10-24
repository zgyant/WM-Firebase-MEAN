// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//structure of the database

var sensorDetailSchema = new Schema({
    sensor_id:String,
    capacity:Number,
    location: String,
    location_precinct: {type:String,unique:true},
    hardware_id:String,
    tags: Date,
    is_active: Boolean,
    assigned_user_email: String,
});


var binDetailSchema = new Schema({
    reading_id:String,
    meta_data:String,
    payload_fields: String,
    hardware_id:String,
    is_active: Boolean,
});



var sensorDetail = mongoose.model('sensorDetail', sensorDetailSchema);
var binsDetail = mongoose.model('binDetail', binDetailSchema);


// make this available to our users in our Node applications
module.exports = sensorDetail;
module.exports = binsDetail;
