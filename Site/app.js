const express = require('express');
const app = express();


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

app.listen(3000, () => {
    console.log('probando el servidor');
});

