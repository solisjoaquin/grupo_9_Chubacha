const fs = require("fs");
const path = require('path')
const { products } = require("../database/models");
const { check, validationResult, body } = require("express-validator");
// const path = require('path')

// ACTION
const productosController = {

  index: (req, res) => {

    products.findAll()
      .then(products => {
        res.render('productos', { products })
      })
  },

  //trae la vista del producto 
  detailproduct: (req, res) => {

    // findByPk me permite traer un elemento especifico de la base de dato
    // usando la primary key
    products.findByPk(req.params.id)
      .then((product) => {
        res.render("producto", { product });
      });
  },

  // este metodo trae la vista del carrito 
  carrito: (req, res) => {
    res.render("carrito");
  },

  // este metodo trae la vista de editar producto
  edit: (req, res) => {

    products.findByPk(req.params.id)
      .then((product) => {
        res.render("editarproducto", { product });
      });
  },

  // este metodo trae la vista de crear producto
  create: (req, res) => {
    res.render("crearproducto");
  },

  // Este metodo usa el metodo post para crear un producto
  // CREAR Producto POST
  store: (req, res) => {

    let error = validationResult(req);
    /*     console.log(req.body) */

    if (error.isEmpty()) {

      let newProduct = req.body;

      if (req.file) {
        newProduct.image = req.file.filename;
      } else if (req.body.oldImage) {
        newProduct.image = req.body.oldImage;
      }

      delete newProduct.oldImage;

      products.create(newProduct)
        .then(newProduct => {
          return res.redirect('/')
        })

    } else {
      res.render("crearProducto", { errors: error.mapped(), body: req.body });
    }
  },

  // este metodo se utiliza para editar un producto
  // EDITAR Producto POST
  update: (req, res) => {

    let updateProduct = req.body;

    if (req.file) {
      updateProduct.image = req.file.filename;
    } else if (req.body.oldImage) {
      updateProduct.image = req.body.oldImage;
    }

    delete updateProduct.oldImage;

    products.update(updateProduct, { where: { id: req.params.id } })
      .then(updateProduct => {
        return res.redirect('/productos/' + req.params.id);
      })

  },

  // DELETE Producto
  delete: async (req, res) => {

    existingProduct = await products.findByPk(req.params.id);

    let imagePath = path.join(__dirname, '../public/images/productos/' + existingProduct.image);

    products.destroy({ where: { id: req.params.id } })
      .then(deletedGroup => {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }

        return res.redirect('/');
      })

  },
};

module.exports = productosController;
