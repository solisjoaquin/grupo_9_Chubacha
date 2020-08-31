const fs = require('fs')

let indexController = {
    // estoy mandando los archivos ejs con render
    // puedo llamarlos con o sin ".ejs"

    index:function(req, res, next) {
      
      // lee el archivo JSON y lo guarda en productosJSON
      let productosJSON = fs.readFileSync('productos.json', {encoding:'utf-8'})
      // parsea en JSON en un objeto literal 
      let productos = JSON.parse(productosJSON)

    res.render("index",{producto: productos})
  }
};

module.exports = indexController;
