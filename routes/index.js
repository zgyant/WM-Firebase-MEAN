var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.sendFile('../client/dist/wastemanagement/index.html');
});

module.exports = router;
