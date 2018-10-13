// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
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

userModelSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userModelSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


var UserDetails = mongoose.model('userModelSchema', userModelSchema);


// make this available to our users in our Node applications
module.exports = UserDetails;
