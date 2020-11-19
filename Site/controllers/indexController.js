const fs = require('fs')

const { products } = require('../database/models')

const indexController = {
  // estoy mandando los archivos ejs con render
  // puedo llamarlos con o sin ".ejs"

  index: function (req, res, next) {
    // lee el archivo JSON y lo guarda en productosJSON
    /* const productosJSON = fs.readFileSync('productos.json', { encoding: 'utf-8' }) */

    // parsea en JSON en un objeto literal
    /* const productos = JSON.parse(productosJSON) */

    products.findAll()
      .then(products => {
        /* res.send(products);  */
        res.render('index', { products })
      })
  }
}

module.exports = indexController
