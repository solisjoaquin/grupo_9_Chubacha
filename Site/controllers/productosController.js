// IMPORT
const fs = require("fs");
const { products } = require("../database/models");
// const path = require('path')

// -----------------------------
// const db = require('database')
// ----------------------------

// ACTION
const productosController = {
  index: (req, res) => {
    const productosJSON = fs.readFileSync("productos.json", {
      encoding: "utf-8",
    });
    const productos = JSON.parse(productosJSON);
    res.render("productos", { productos: productos });
  },
  detailproduct: (req, res) => {
    let idProducto = req.params.id;
    idProducto = idProducto - 1;

    products.findAll().then((products) => {
      const productoAEditar = products[idProducto];
      res.render("producto", { productoAEditar, idProducto });
    });
  },

  carrito: (req, res) => {
    const productosJSON = fs.readFileSync("productos.json", {
      encoding: "utf-8",
    });
    const productos = JSON.parse(productosJSON);
    res.render("carrito", { productos: productos });
  },

  edit: (req, res) => {
    const idProducto = req.params.id;

    const productosJSON = fs.readFileSync("productos.json", {
      encoding: "utf-8",
    });
    const productos = JSON.parse(productosJSON);
    const productoAEditar = productos[idProducto - 1];

    res.render("editarproducto", {
      productoAEditar: productoAEditar,
      idProducto: idProducto,
    });
  },

  // GET Producto
  create: (req, res) => {
    res.render("crearproducto");

    /*
    db.Product.findAll()
      .then(function(products){
          return res.render("Products", {products.products})
      })

    */
  },

  // CREAR Producto POST
  store: (req, res, next) => {
    /*
    db.Product.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      tipoProductos: req.body.tipoProductos,
      imagen: req.files[0].filename
    }),
    */
    const producto = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      tipoProductos: req.body.tipoProductos,
      imagen: req.files[0].filename,
    };
    const archivoProductos = fs.readFileSync("productos.json", {
      encoding: "utf-8",
    });
    let productos;
    if (archivoProductos === "") {
      productos = [];
    } else {
      productos = JSON.parse(archivoProductos);
    }
    productos.push(producto);

    const productosJSON = JSON.stringify(productos);
    fs.writeFileSync("productos.json", productosJSON);

    // res.render('producto',{producto: producto})
    res.redirect("/");
  },

  // EDITAR Producto POST
  update: (req, res) => {
    /*
    let pedidoProdut= db.Product.findByPk(req.params.id);

    let pedidoCategoryProduct = db.CategoryProduc.findAll();

    Promise.all(pedidoProduct, pedidoCategoryProduct)
      .then(function(product, category_product){
          res.render("editProduct",{product:product, category_product: category_product})
      })

    */

    const idProducto = req.params.id;

    /*         let producto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            tipoProductos: req.body.tipoProductos
        } */

    // leer el archivo JSON y parsearlo a objeto literal
    const archivoProductos = fs.readFileSync("./data/productos.json", {
      encoding: "utf-8",
    });
    productos = JSON.parse(archivoProductos);

    // REEMPLAZO con nuevos elementos
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id == idProducto) {
        (productos[i].nombre = req.body.nombre),
          (productos[i].descripcion = req.body.descripcion),
          (productos[i].precio = req.body.precio),
          (productos[i].tipoProductos = req.body.tipoProductos);
      }
    }

    const productosJSON = JSON.stringify(productos);
    fs.writeFileSync("productos.json", productosJSON);

    // res.render('producto',{producto: producto})
    res.redirect("/");
    // res.send(req.body)
    /* let putVar = req.body
        res.send(putVar) */
  },

  // DELETE Producto
  delete: (req, res) => {
    res.send("producto eliminado");
  },
};

module.exports = productosController;
