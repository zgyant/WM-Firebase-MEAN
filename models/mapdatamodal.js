// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//structure of the database

var assignUserSchema = new Schema({
    location_precinct: {type:String,unique:true},
    hardware_id:String,
    is_active: Boolean,
    assigned_user_email: String,
});



var assignUser = mongoose.model('assignUserDetails', assignUserSchema);


// make this available to our users in our Node applications
module.exports = assignUser;
