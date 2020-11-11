const fs = require("fs");
const path = require('path')
const { products } = require("../database/models");
// const path = require('path')

// ACTION
const productosController = {

  index: (req, res) => {
    /* const productosJSON = fs.readFileSync("productos.json", {
      encoding: "utf-8",
    });
    const productos = JSON.parse(productosJSON);
    res.render("productos", { productos: productos }); */

    products.findAll()
      .then(products => {
        /* res.send(products);  */
        res.render('productos', { products })
      })
  },

  detailproduct: (req, res) => {

    products.findByPk(req.params.id)
      .then((product) => {
        res.render("producto", { product });
      });
  },

  carrito: (req, res) => {

    res.render("carrito");
  },

  edit: (req, res) => {


    products.findByPk(req.params.id)
      .then((product) => {
        res.render("editarproducto", { product });
      });

  },

  // GET Producto
  create: (req, res) => {
    res.render("crearproducto");



  },

  // CREAR Producto POST
  store: (req, res) => {

    /* let errors = validationResult(req);

    if (errors.isEmpty()) { */


    let newProduct = req.body;
    newProduct.image = 'default.png';

    if (req.file) {
      newProduct.image = req.file.filename;
    } else if (req.body.oldImage) {
      newProduct.image = req.body.oldImage;
    }

    delete newProduct.oldImage;

    products.create(newProduct)
      .then(newProduct => {
        return res.redirect('/')
        /* return res.redirect('/products/' + newProduct.id); */
      })


    /*  } */

    /*  else {
        // let categories = categoriesModel.all();

        category.findAll()
            .then(categories => {
                return res.render('products/create',  { 
                    categories,
                    errors: errors.mapped(), 
                    products: req.body
                });
            })
            .catch(error => {
                console.log(error);
                return res.redirect('/');
            })
    } */
  },

  // EDITAR Producto POST
  update: (req, res) => {

    let updateProduct = req.body;

    if (req.file) {
      updateProduct.image = req.file.filename;
    } else if (req.body.oldImage) {
      updateProduct.image = req.body.oldImage;
    }

    delete updateProduct.oldImage;

    // groupId = groupsModel.update(group);
    // res.redirect('/groups/' + groupId)

    products.update(updateProduct, { where: { id: req.params.id } })
      .then(updateProduct => {
        return res.redirect('/productos/' + req.params.id);
      })

  },

  // DELETE Producto
  delete: async (req, res) => {

    existingProduct = await products.findByPk(req.params.id);

    let imagePath = path.join(__dirname, '../public/images/productos/' + existingProduct.image);
    console.log('THis is the path');
    console.log(imagePath);

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
