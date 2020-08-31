let fs = require("fs");
let path = require('path');


let productosController = {
    // estoy mandando los archivos ejs con render
    // puedo llamarlos con o sin ".ejs"

    index:(req,res)=>{
        let productosJSON = fs.readFileSync('productos.json', {encoding:'utf-8'})
        let productos = JSON.parse(productosJSON)
        res.render("productos", {productos:productos})
    },
    detailproduct: (req,res)=>{
        let idProducto = req.params.id
        idProducto = idProducto-1;

        let productosJSON = fs.readFileSync('productos.json', {encoding:'utf-8'})
        let productos = JSON.parse(productosJSON)
        let productoAEditar = productos[idProducto]


         res.render("producto" , {productoAEditar: productoAEditar, idProducto:idProducto})
        //res.send(idProducto)
    },
    carrito:(req,res)=>{
        let productosJSON = fs.readFileSync('productos.json', {encoding:'utf-8'})
        let productos = JSON.parse(productosJSON)
        res.render("carrito", {productos:productos})
    },
    edit:(req,res)=>{
        let idProducto = req.params.id;
        
        let productosJSON = fs.readFileSync('productos.json', {encoding:'utf-8'})
        let productos = JSON.parse(productosJSON)
        let productoAEditar = productos[idProducto-1]

        res.render("editarproducto", {productoAEditar:productoAEditar, idProducto:idProducto})
        //res.send(idProducto)
    },

    // traer vista de creacion de producto por get
    create:(req,res)=>{
        res.render('crearproducto')
    },

    // crear producto por POST
    store:(req,res, next)=>{

        let producto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            tipoProductos: req.body.tipoProductos,
            imagen: req.files[0].filename
        } 
        let archivoProductos = fs.readFileSync('productos.json', {encoding: 'utf-8'});
        let productos;
        if (archivoProductos == ""){
            productos = [];
        } else {
            productos = JSON.parse(archivoProductos);
        };
        productos.push(producto)

        let productosJSON = JSON.stringify(productos);
        fs.writeFileSync('productos.json', productosJSON)

        //res.render('producto',{producto: producto})
        res.redirect('/')
    },

    // editar producto por PUT
    update:(req,res)=>{
        let idProducto = req.params.id;

/*         let producto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            tipoProductos: req.body.tipoProductos
        } */

        // leer el archivo JSON y parsearlo a objeto literal
        let archivoProductos = fs.readFileSync('./data/productos.json', {encoding: 'utf-8'});
        productos = JSON.parse(archivoProductos);

        //reemplazo con los nuevos elementos
        for (let i=0; i<productos.length; i++){
            if (productos[i].id == (idProducto)){
                productos[i].nombre = req.body.nombre,
                productos[i].descripcion = req.body.descripcion,
                productos[i].precio = req.body.precio,
                productos[i].tipoProductos = req.body.tipoProductos
            }
        }

        let productosJSON = JSON.stringify(productos);
        fs.writeFileSync('productos.json', productosJSON)

        //res.render('producto',{producto: producto})
        res.redirect('/')
        //res.send(req.body)
        /* let putVar = req.body
        res.send(putVar) */
    },

    // eliminar prouducto por DELETE
    delete:(req,res)=>{
        res.send("producto eliminado")
    }
};

module.exports = productosController;
