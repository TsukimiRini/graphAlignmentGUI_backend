const http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getResultRouter = require('./routes/getresult');

var app = express();
var session = require('express-session');
//设置跨域头
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getresult', getResultRouter);

// config session
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 1000 * 60 * 60 * 3 },
    resave: false,
    saveUninitialized: false,
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log(err.status);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(cookieParser());
// set the static folder as the public
app.use(express.static(path.join(__dirname, 'public')));
let port = process.env.PORT || 8088;
app.set('port', port);

let server = http.createServer(app);

server.listen(port, function () {
  console.log(`Server passport listening on port: ${port}`);
});

module.exports = app;
