const express = require("express");
const app = express();
const path = require("path"); // libreria path para manejar rutas de archivos
const fs = require("fs"); // libreria filesystem
const session = require("express-session"); // Sesion
const auth = require("./middlewares/auth"); // middleware de autenticacion
const { products, users } = require("./database/models"); // Base de datos

// instalar para usar el metodo PUT , mas abajo se la utiliza con el use
const methodOverride = require("method-override");

// configurar el manejo de los archivos ejs
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// para el method POST
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // arma el objeto body
// ------------
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(
  session({
    secret: "Chubacha login",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(auth);

// agregar esta linea para el uso del PUT, verifica si existe el method en el querystring
app.use(methodOverride("_method"));

// importar las rutas a usar y setearlas en una variable
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usuarios");
const productsRouter = require("./routes/productos");
const apiRouter = require('./routes/api')

// establecer las rutas a usar
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/productos", productsRouter);
app.use('/api', apiRouter);

// llamando a la base de datos
app.get("/sql", (req, res) => {
  products.findAll().then((products) => {
    /* res.send(products);  */
    res.render("productos", { products });
  });
});

app.get("/sqlusers", (req, res) => {
  users.findAll().then((users) => {
    res.send(users);
  });
});


// mostrar pantalla de error 404. usa el ejs 'not-found'
app.use(function (req, res, next) {
  res.status(404).render("not-found");
});

module.exports = app;
