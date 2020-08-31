var express = require('express');
var router = express.Router();
var controller = require('../controllers/productosController.js');
var path = require('path');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'data')
    },
    filename: function(req, file, cb){
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({storage: storage});

router.get('/', controller.index);

router.get('/carrito',controller.carrito);

// la ruta get trae la vista, el post envia la info
router.get('/crearproducto', controller.create);
router.post('/crearproducto',upload.any(), controller.store)

// ruta para acceder al detalle de un producto
router.get('/:id', controller.detailproduct);

// ruta para acceder a la vista de editar un producto
router.get('/:id/editar', controller.edit);
// ruta que permite editar el valor de un producto
router.put('/:id',controller.update);

// ruta que permite borrar un producto
router.delete('/:id', controller.delete);


module.exports = router;
