var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/users', function(req, res, next) {
    res.sendfile('public/dashboard/users.html');
});

router.get('/mod', function(req, res, next) {
    res.sendfile('public/dashboard/moderator.html');
});


module.exports = router;
