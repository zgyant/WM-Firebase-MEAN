var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');




var app = express();

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist/wastemanagement')));
app.use('/', indexRouter);

//catch other router and send response
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client/dist/wastemanagement/index.html'))
});




module.exports = app;
