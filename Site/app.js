//
// correr el servidor
// nodemon bin/www

// ----------------------------------------------
var express = require('express')
var path = require('path')
var app = express()
// instalar para usar el metodo PUT , mas abajo se la utiliza con el use
var methodOverride = require('method-override')

// configurar el manejo de los archivos ejs
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// para el method POST
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// ------------
app.use(express.static(path.join(__dirname, 'public')))

// agregar esta linea para el uso del PUT
app.use(methodOverride('_method'))

// importar las rutas a usar y setearlas en una variable
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/usuarios')
var productsRouter = require('./routes/productos')

// establecer las rutas a usar
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/productos', productsRouter)

// ---------------------------------------------
// mostrar pantalla de error 404. usa el ejs 'not-found'
app.use(function (req, res, next) {
  res.status(404).render('not-found')
})

module.exports = app

// ****   VIEJO CODIGO  ************************

/* const express = require('express');
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
