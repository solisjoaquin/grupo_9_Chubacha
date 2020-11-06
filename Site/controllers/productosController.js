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
    let idProducto = req.params.id;
    idProducto = idProducto - 1;

    /* const productosJSON = fs.readFileSync("productos.json", {
      encoding: "utf-8",
    });
    const productos = JSON.parse(productosJSON);
    const productoAEditar = productos[idProducto - 1]; */

    products.findAll().then((products) => {
      const productoAEditar = products[idProducto];
      res.render("editarproducto", { productoAEditar, idProducto });
    });

/*     res.render("editarproducto", {
      productoAEditar: productoAEditar,
      idProducto: idProducto,
    }); */
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

    products.destroy({ where: { id: req.params.id } })
    .then(deletedGroup => {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }

        return res.redirect('/');
    })

    /* res.send("producto eliminado"); */
  },
};

module.exports = productosController;
