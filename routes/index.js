var express = require('express');
var router = express.Router();
var users = require('../lib/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'camonyo' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'camonyo' });
});

router.post('/signup', function(req, res, next) {
  users.addUser(req, res)
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'camonyo' });
});

router.post('/login', function(req, res, next) {
  users.login(req, res);
});

router.get('/maps/:id', function(req, res, next) {
  var id = req.param('id');
  res.render('map', { mapId: id });
});


module.exports = router;
