var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var config = require('./config/database');
var indexRouter = require('./routes/index');
var app = express();


//database connection
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.set('view engine', 'ejs');
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/client/dist/wastemanagement/')));
app.use('/home', express.static(path.join(__dirname, '/client/dist/wastemanagement/')))
app.use('/api', indexRouter);
// //catch other router and send response
// app.get('*',(req,res)=>{
//   res.sendFile(path.join(__dirname,'client/dist/wastemanagement/index.html'))
// });



module.exports = app;
