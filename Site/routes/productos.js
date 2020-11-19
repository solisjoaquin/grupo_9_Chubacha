var express = require('express')
var router = express.Router()
var controller = require('../controllers/productosController.js')
var path = require('path')
const publicRoutes = require('../middlewares/publicRoutes') // middleware para bloquear rutas para no usuarios
const validateProduct = require('../validators/products')
const onlyAdmins = require('../middlewares/log')

// manejo de archivos----------------------------------------------------
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/productos')
  },
  filename: function (req, file, cb) {
    cb(null, 'product-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })
//----------------------------------------------------------------------

router.get('/', controller.index)
router.get('/carrito', controller.carrito)


// Rutas para mostrar la vista y crear el producto
router.get('/crearproducto', publicRoutes, onlyAdmins, controller.create)
router.post('/crearproducto', upload.single("image"), validateProduct.create, controller.store)

// ruta para acceder al detalle de un producto
router.get('/:id', controller.detailproduct)

// ruta para acceder a la vista de editar un producto
router.get('/:id/editar', publicRoutes, onlyAdmins, controller.edit)

// ruta que permite editar el valor de un producto
router.put('/:id', upload.single("image"), controller.update)

// ruta que permite borrar un producto
router.delete('/:id', controller.delete)

module.exports = router
