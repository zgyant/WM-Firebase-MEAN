var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var indexRouter = require('./routes/index');
mongoose.connect('mongodb://localhost:27017/wastemanagement');
var app = express();


//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist/wastemanagement')));
app.use('/', indexRouter);
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
//catch other router and send response
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client/dist/wastemanagement/index.html'))
});




module.exports = app;
