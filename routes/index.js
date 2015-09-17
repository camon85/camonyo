var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'camonyo' });
});

router.get('/maps/:id', function(req, res, next) {
  var id = req.param('id');
  res.render('map', { mapId: id });
});


module.exports = router;
