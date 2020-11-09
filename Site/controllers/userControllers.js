const fs = require("fs");
const bcrypt = require("bcryptjs");
const cookie = require("cookie-parser");

const { users } = require('../database/models')

/* console.log(bcrypt.hashSync('123456', 10)) */

const { check, validationResult, body } = require("express-validator");

const jsonTable = require("../database/jsonTable");
const usersModel = jsonTable("users");

// ACTION
const userController = {
  index: function (req, res) {
    res.send("lista de usuarios");
  },
  login: function (req, res) {
    res.render("login");
  },

  authenticate: function (req, res) {
    let error = validationResult(req);
    /* console.log(error.mapped) */

    if (error.isEmpty()) {

      users.findAll().then((users) => {

        const user = users.find(user => user.email == req.body.email);
        console.log(user)


        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            delete user.password;
            req.session.user = user;
            res.redirect("/");
          } else {
            res.render("login", {
              errors: { password: { msg: "El password es incorrecto" } },
              user: req.body,
            });
          }
        }

      })

      /* let user = usersModel.findByField("email", req.body.email);
       if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          delete user.password;
          req.session.user = user;
          res.redirect("/");
        } else {
          res.render("login", {
            errors: { password: { msg: "El password es incorrecto" } },
            user: req.body,
          });
        }
      } */

      /* res.send( user || 'No se encontro el usuario') */
    } else {
      res.render("login", { errors: error.mapped() });
    }
  },



  // estoy mandando los archivos ejs con render
  // puedo llamarlos con o sin ".ejs"
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  register: function (req, res) {
    res.render("register");
  },
  profile: function (req, res) {
    res.render("profile.ejs");
  },

  store: (req, res, next) => {
    const user = {
      nombre: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      contraseña: req.body.password,
      avatar: req.files[0].filename,
    };
    const archivoUsuarios = fs.readFileSync("usuarios.json", {
      encoding: "utf-8",
    });
    let users;
    if (archivoUsuarios === "") {
      users = [];
    } else {
      users = JSON.parse(archivoUsuarios);
    }
    users.push(user);

    const usuariosJSON = JSON.stringify(users);
    fs.writeFileSync("usuarios.json", usuariosJSON);
    res.redirect("/");
  },
};

// EXPORT
module.exports = userController;
