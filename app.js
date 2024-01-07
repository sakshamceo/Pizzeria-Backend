var createError = require('http-errors');
var express = require('express');
var path = require('path');
var router = express.Router();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var orderpizzaRouter =require('./routes/orderpizza');
var toppingRouter = require('./routes/toppings');
var loginRouter = require('./routes/login');
var sendorders= require('./routes/orders');
// var mailRouter = require('./routes/email');
var app = express();

//---connection


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/OrderPizza', orderpizzaRouter );
app.use('/BuildPizza',toppingRouter);
app.use('/login',loginRouter);
app.use('/send',sendorders);
// app.use('/email', mailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// router.use(middlewareFunction);
module.exports = app;
