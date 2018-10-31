var express = require('express');
var router = express.Router();
var User=require('../models/usermodel');
var assignUser=require('../models/mapdatamodal');
var binDetails=require('../models/binMgmgModel');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var config = require('../config/database');
var jwt = require('jsonwebtoken');
require('../config/passport')(passport);
var Strategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
const functions = require('firebase-functions');
var admin = require("firebase-admin");
var _ = require('underscore');

var serviceAccount = require("../config/service_account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wastemanagement-1540370241908.firebaseio.com"
});



// Get a database reference to our posts
var db = admin.database();
var ref = db.ref();

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


//ROUTE TO Asing USER TO BIN
router.post('/assign/user',function(req,res){
    ref.orderByChild('location_precinct').equalTo(req.body.binTitle).on("value", function(snapshot) {
        var search_data=snapshot.val();
        var keys=Object.keys(search_data);

        for(var i=0;i<keys.length;i++)
        {
            var k=keys[i];
            var hardware_id=search_data[k].hardware_id;
            var location_precincts=search_data[k].location_precinct;
        }
        var assignUsertoBin=new assignUser({

            location_precinct: location_precincts,
            hardware_id:hardware_id,
            is_active:1,
            assigned_user_email:req.body.userEmail

        });

        assignUsertoBin.save().then(item => {


            var mailOptions = {
                from: 'hashitpteam@gmail.com',
                to: req.body.userEmail,
                subject: 'New Bin Assigned',
                text: 'You have been assigned to new bin:\nBin Name: '+location_precincts+'\nHardware Id: '+hardware_id,
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({success: true,msg: 'New user assigned'});
                }
            });
        })
            .catch(err => {
                res.status(400).send(err);
            });

    });


});

//ROute to get user assigned bins

router.get('/get/notification',function (req,res) {

    // res.send(req.query.username);
        assignUser.find({"assigned_user_email":req.query.userEmail},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            //console.log(result);
            res.json(result);
        }
    });

});

//ROute to seen notification

router.get('/seen/notification',function (req,res) {

    // res.send(req.query.username);
    assignUser.update({"assigned_user_email":req.query.userEmail},{"is_active":"false"},{ multi: true },function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            //console.log(result);
            res.json(result);
        }
    });

});

//Route to send mail notification
router.get('/checkUpdate',function(req,res){

});

//ROute to maximum threshold

router.post('/setThres',function(req,res) {

    ref.orderByChild('location_precinct').equalTo(req.body.hardwareName).on("value", function (snapshot) {
        var search_data = snapshot.val();
        var keys = Object.keys(search_data);

        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var hardware_id = search_data[k].hardware_id;
            var location_precincts = search_data[k].location_precinct;
        }




        var findBin=binDetails.find({hardware_id: hardware_id}, function(err, result) {
            if (err) {
                console.log(err);
            }else
            {
                if(!result.length)
                {
                    var binMgmt = new binDetails({
                        hardware_id:hardware_id,
                        threshold:req.body.binThreshold,
                        condition:req.body.condition
                    });
                    binMgmt.save();

                    res.json({message:'Saved'});
                }else
                {
                    res.json({message:'Failed'});
                }
            }
        });


        var binMgmt = new binDetails({
            hardware_id:hardware_id,
            threshold:req.body.binThreshold,
            condition:req.body.condition
        });
    });
});

//ROUTE TO PARSE THE JSON MAP DATA
router.get('/mapdata',function(req,res) {
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value",function(snapshot) {
        var bin_data = snapshot.val();
console.log(bin_data);
        var keys = Object.keys(bin_data);

        var dataOneArray = new Array();
        var dataTwoArray = new Array();

        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            var metadata = bin_data[k].metadata;
            var payload_fields = bin_data[k].payload_fields;
            var capacity = bin_data[k].capacity;

            var hardware_id = bin_data[k].hardware_id;
            var location = bin_data[k].location;
            var location_precint = bin_data[k].location_precinct;
            var tags = bin_data[k].tags;
            var sensor_hardware_id = payload_fields && payload_fields.hardware_id ? payload_fields.hardware_id : null;
            var level = payload_fields && payload_fields.level ? payload_fields.level : null;
            var time = metadata && metadata.time ? metadata.time : null;
            var latitude = location && location.latitude ? location.latitude : null;
            var longitude = location && location.longitude ? location.longitude : null;
            var addressPoint = "[" + latitude + "," + longitude + "]";
            var dataOne, dataTwo;

            dataOne = {
                hardware_id: hardware_id,
                capacity: capacity,
                location_precint: location_precint,
                addressPoint: addressPoint,
                latitude: latitude,
                longitude: longitude,
                tags: tags
            };


            dataTwo = {hardware_id: sensor_hardware_id, time: time, level: level};

            if (hardware_id)
                dataOneArray.push(dataOne);

            if (sensor_hardware_id != null)
                dataTwoArray.push(dataTwo);

        }

        var arrResult = _.map(dataOneArray, function (obj) {
            return _.assign(obj, _.find(dataTwoArray, {
                hardware_id: obj.hardware_id
            }));
        });
       // console.log(arrResult);

        // res.setHeader("Content-Type", "text/html");
        // res.end();
        // return JSON.stringify(arrResult);
        // res.end();
        console.log(JSON.stringify(arrResult));
        res.send(JSON.stringify(arrResult));
        console.log("--------------------------------------------");




    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });



});

//Auto Mail Send
ref.on("child_changed",function(snapshot) {
    var bin_data = snapshot.val();
    console.log(bin_data);
    var keys = Object.keys(bin_data);
    for(var i=0;i<keys.length;i++)
    {
        var k=keys[i];
        var payload_fields = bin_data[k].payload_fields;
        var hardware_id=bin_data[k].hardware_id;
        var level=bin_data[k].level;

        if(hardware_id)
        {
            var ghardware_id = bin_data[k].hardware_id;
            var glevel = bin_data[k].level;

            console.log(hardware_id);

            ref.orderByChild('hardware_id').equalTo(ghardware_id).on("value", function(snapshot) {

                var search_data=snapshot.val();
                var keys=Object.keys(search_data);

                //console.log(search_data);
                for(var i=0;i<keys.length;i++)
                {
                    var k=keys[i];
                    var capacity=search_data[k].capacity;
                    var location_precincts=search_data[k].location_precinct;
                    var assigneduser;
                    var thres;
                    var cond;
                    console.log(search_data[k]);

                    binDetails.find({hardware_id: hardware_id}, function(err, result) {
                        if (err) {
                            console.log(err);
                        }else
                        {
                            console.log(result[0]);
                            cond=result[0].condition;
                            if(glevel>result[0].threshold)
                            {

                                assignUser.find({"hardware_id":hardware_id},function(err,result){
                                    if(err)
                                    {
                                        console.log(err);
                                    }
                                    else
                                    {
                                        assigneduser=result[0].assigned_user_email;
                                        //res.json(result);
                                        var mailOptions = {
                                            from: 'hashitpteam@gmail.com',
                                            to: assigneduser,
                                            subject: 'Bin Needs Attention',
                                            text: 'This bin needs attention:\nBin Name: '+
                                                location_precincts+'\nHardware Id: '+
                                                hardware_id+"\nPercentage Free: "+
                                                (((capacity-glevel)*100)/capacity).toPrecision(5)+"%\nBin Condition: "+cond,

                                        };
                                        transporter.sendMail(mailOptions, function(error, info){
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                                res.json({success: true,msg: 'New user added'});
                                            }
                                        });
                                    }
                                });

                            }

                        }
                    });


                    console.log("thresold"+thres);

                }


            });
        }
    }
    // console.log(snapshot.val());
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
