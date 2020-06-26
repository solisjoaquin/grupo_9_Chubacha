const express = require('express');
const app = express();


//Pedido a pagina Home
app.get('/', (req, res) => {
    res.send('Probando123')
});

//Pedido a pagina Productos
app.get('/Productos', (req, res) => {
    res.send('Probando 123')
});

//Pedido a pagina Carrito de Compras
app.get('/Carrito', (req, res) => {
    res.send('Probando 123')
});

//Pedido a pagina Registro y Login
app.get('/RegistroLogin', (req, res) => {
    res.send('Probando 123')
});

app.listen(3000, () => {
    console.log('probando el servidor');
});

