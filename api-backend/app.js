const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { decodeToken } = require('./middleware/index');
const authRoutes = require('./app/auth/router');
const categoriesRoutes = require('./app/category/routes');
const tagRoutes = require('./app/tag/routes');
const productRoute = require('./app/product/routes');
const imageRoutes = require('./app/imageRoutes/routes');
const deliveryAddressRoutes = require('./app/deliveryaddress/routes');
const cartRoutes = require('./app/cart/routes');
const orderRoutes = require('./app/order/routes');
const invoiceRoutes = require('./app/invoice/routes');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(decodeToken());

app.use('/auth', authRoutes);
app.use('/api/products', productRoute);
app.use('/api/images', imageRoutes);
app.use('/api/category', categoriesRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/delivery-addresses', deliveryAddressRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/invoice', invoiceRoutes);

// home
app.get('/api', function(req, res) {
  res.render('index', {
    title: 'Eduwork Service'
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
