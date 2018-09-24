var router = require('express')();

/* GET home page. */
router.get('/', function(req, res) {
    res.sendfile('public/dashboard/login.html');
});

router.get('/login', function(req, res) {
    res.sendfile('public/dashboard/login.html');
});

router.post('/user/login', function(req, res) {
    res.send('POST request to the homepage')
});


router.get('/users', function(req, res) {
    res.sendfile('public/dashboard/users.html');
});

router.get('/mod', function(req, res) {
    res.sendfile('public/dashboard/moderator.html');
});


module.exports = router;
