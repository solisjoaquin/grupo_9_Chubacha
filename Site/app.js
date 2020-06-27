const express = require('express');
const app = express();


//Pedido a pagina Home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

//Pedido a pagina Productos
app.get('/Productos', (req, res) => {
    res.sendFile(__dirname + '/views/Productos.html' )
});

//Pedido a pagina Carrito de Compras
app.get('/Carrito', (req, res) => {
    res.sendFile(__dirname + '/views/Carrito.html')
});

//Pedido a pagina Registro y Login
app.get('/RegistroLogin', (req, res) => {
    res.sendFile(__dirname + '/views/RegistroLogin.html')
});

app.listen(3000, () => {
    console.log('probando el servidor');
});

