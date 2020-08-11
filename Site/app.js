var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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



// ****   VIEJO CODIGO  ************************

/*const express = require('express');
const app = express();

app.use(express.static('public'));

//Pedido a pagina Home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

//Pedido a pagina Productos
app.get('/producto', (req, res) => {
    res.sendFile(__dirname + '/views/producto.html' )
});

//Pedido a pagina Carrito de Compras
app.get('/carrito', (req, res) => {
    res.sendFile(__dirname + '/views/carrito.html')
});

//Pedido a pagina Registro y Login
app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/views/registro.html')
});


//Pedido a pagina Registro y Login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

app.listen(3002, () => {
    console.log('probando el servidor');
});
*/
