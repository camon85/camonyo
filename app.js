var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var Twitter = require('twitter');
var twitterClient = new Twitter({
  consumer_key: 'qStcdiUWpMQ0tYOW2HzRxuCgZ',
  consumer_secret: 'Vyp7GiyIjNVFe80RgsCogPyp4WpYG4rIPd7rdMIPtGVLqQVzeY',
  access_token_key: '3756323599-1bYOGaeCydmcjJDuKBq4rMPHuRj4gS2K80OpFsm',
  access_token_secret: '1o1brMevX2G7vS5ha8TBSBiz5FSGRGhtBLXvjS33IxiRm'
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

  // tweet
  twitterClient.post('statuses/update', {status: "[camonyo] " + err},  function(error, tweet, response){
    if(error) throw error;
  });
});


module.exports = app;
