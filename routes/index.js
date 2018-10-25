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
var firebase=require('../config/firebase');
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

//ROUTE TO CHECK THE LOGIN
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
                    console.log(user.toJSON());
                    res.json({success: true, token: 'JWT ' + token,userName:req.body.username,userDetails:user.toJSON()});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

//ROUTE TO LOGOUT
router.get('/logout', function(req, res) {
    //req.session.reset();
    req.logout();
    res.redirect('login');
});

//MANUAL USER INSERT
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

//ROUTE TO ADD NEW USER
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
    console.log(req.body.password);
    newUser.save().then(item => {

        var mailOptions = {
            from: 'hashitpteam@gmail.com',
            to: req.body.email,
            subject: 'New Account Created',
            text: 'Below is the detail to waste management system by Hash: \nUsername: '+req.body.username+'\nPassword: '+req.body.password,
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.json({success: true,msg: 'New user added'});
            }
        });
    })
        .catch(err => {
            res.status(400).send("Duplicate Data (username/email)");
        });


});


//ROUTE TO VIEW USER DATA IN DATATABLE
router.get('/users/getAll',function(req,res){

   var findAllQuery= User.find({'is_active':'true'})
    findAllQuery.exec().then(function(userData){
        return res.json(userData);
    });

    console.log('Getting all the users saved');

});


//ROUTE TO PARSE THE JSON MAP DATA



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
