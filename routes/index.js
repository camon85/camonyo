var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'camonyo' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'camonyo' });
});

router.post('/login-process', function(req, res, next) {
  var id = req.param('id');
  var email = req.param('email');
  var nickName = req.param('nickName');
  console.log('#id: ' + id);

  // TODO DB에 insert

  res.redirect("/");
});

router.get('/maps/:id', function(req, res, next) {
  var id = req.param('id');
  res.render('map', { mapId: id });
});


module.exports = router;
