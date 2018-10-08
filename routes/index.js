var express = require('express');
var router = express.Router();
var userModel=require('../models/usermodel');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
router.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'anything',
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new Strategy(
    function(username, password, cb) {
        userModel.findByUsername(username, function(err, userModel) {
            if (err) { return cb(err); }
            if (!userModel) { return cb(null, false); }
            if (userModel.password != password) { return cb(null, false); }
            return cb(null, userModel);
        });
    }
));

passport.serializeUser(function(userModel, cb) {
    cb(null, userModel.id);
});

passport.deserializeUser(function(id, cb) {
    userModel.findById(id, function (err, userModel) {
        if (err) { return cb(err); }
        cb(null, userModel);
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('../client/dist/wastemanagement/index.html',{ username : req.username });
});


router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/home');
    });

router.get('/logout', function(req, res) {
    //req.session.reset();
    req.logout();
    res.redirect('login');
});


router.get('/newuser',function(req,res)
{
    var newUser = new userModel({

        fullName:"Jayant Mishra",
        username:"admin",
        password: "password",
        email: "admin@admin.com",
        country:"Nepal",
        created_at: "2018/08/01",
        is_active: 1,
        userType: "admin",
    });

    newUser.save();

    return res.redirect('/login')

});

module.exports = router;
