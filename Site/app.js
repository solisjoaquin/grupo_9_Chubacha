
// DEPENDENCIAS
// ----------------------------------------------
const express = require('express')
const path = require('path')
const session = require('express-session')
const app = express()

// instalar para usar el metodo PUT , mas abajo se la utiliza con el use
const methodOverride = require('method-override')

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
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/usuarios')
const productsRouter = require('./routes/productos')
const userController = require('./controllers/userControllers')
const user = require('./database/models/user');


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
// ID CLIENTE google api 1086531099334-orhot4p7go2rg7vh7jvv54c1pkoorovb.apps.googleusercontent.com

// Secreto Cliente  o0v98Y4GsMdMF0_eGVeHjstQ