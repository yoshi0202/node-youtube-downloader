var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var config = require(__dirname + '/config/config.json');

//router setting
var index = require('./routes/index');
var download = require('./routes/download');
var search = require('./routes/search');
var update = require('./routes/update');
var rename = require('./routes/rename');
var normalize = require('./routes/normalize');

var app = express();
var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', config.app.port);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/', index);
app.use('/download', download);
app.use('/search', search);
app.use('/update', update);
app.use('/rename', rename);
app.use('/normalize', normalize);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
