var express = require('express');
var router = express.Router();
var User=require('../models/usermodel');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var config = require('../config/database');
var jwt = require('jsonwebtoken');
require('../config/passport')(passport);
var Strategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hashitpteam@gmail.com',
        pass: 'wwdemo123'
    }
});
console.log(config);
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Express RESTful API');
});


router.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token,userName:req.body.username});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});


router.get('/logout', function(req, res) {
    //req.session.reset();
    req.logout();
    res.redirect('login');
});


router.get('/newuser',function(req,res)
{
    var newUser = new User({

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

router.post('/add/newuser',function(req,res)
{
    var newUser = new User({

        fullName:req.body.fullname,
        username:req.body.username,
        password: req.body.password,
        email: req.body.email,
        country:req.body.country,
        created_at: Date.now(),
        is_active: 1,
        userType: req.body.usertype,
    });
    newUser.save();
    var mailOptions = {
        from: 'hashitpteam@gmail.com',
        to: req.body.email,
        subject: 'New Account Created',
        text: 'Below is the detail to waste management system by Hash: \nUsername: '+req.body.email+'\nPassword: '+req.body.password,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.json({success: true,msg: 'New user added'});
});

router.get('/users/getAll',function(req,res){

   var findAllQuery= User.find()
    findAllQuery.exec().then(function(userData){
        return res.json(userData);
    });

    console.log('Getting all the users saved');

});
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
