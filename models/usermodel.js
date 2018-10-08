// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// create a schema
var userModelSchema = new Schema({
    fullName:String,
    username:String,
    password: String,
    email: String,
    country:String,
    created_at: Date,
    is_active: Boolean,
    userType: String,
    // attachment:String

});

userModelSchema.plugin(passportLocalMongoose);

var UserDetails = mongoose.model('userModelSchema', userModelSchema);


// make this available to our users in our Node applications
module.exports = UserDetails;
