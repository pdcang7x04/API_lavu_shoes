var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const mongoose = require('mongoose');
require('./controller/user/userModel')
require('./controller/user/UserOTPVerification')
require('./controller/user/AccountGoogle')
require('./controller/brand/brandModel')
require('./controller/category/categoryModel')
require('./controller/product/productModel')

var usersRouter = require('./routes/users');
var brandsRouter = require('./routes/brands')
var categoriesRouter = require('./routes/categories')
var productsRouter = require('./routes/products')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('/brands', brandsRouter)
app.use('/categories', categoriesRouter)
app.use('/products', productsRouter)


mongoose.connect('mongodb+srv://phamdinhcang350:2eXqbBVIpbMq0jGg@duantotnghiep.sj9fy.mongodb.net/Lavu?retryWrites=true&w=majority&appName=DuAnTotNghiep')
.then(() => {console.log('Connect database success!!...')})
.catch(() => {console.log('Connect fail!!...')})


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

module.exports = app;
