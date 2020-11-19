const fs = require("fs");
const bcrypt = require("bcryptjs");
const { users } = require('../database/models')

const { check, validationResult, body } = require("express-validator");

// ACTION
const userController = {

  index: function (req, res) {
    res.redirect("/");
  },
  // este metodo trae la vista del login
  login: function (req, res) {
    res.render("login");
  },

  // este metodo se utiliza para el login del usuario
  authenticate: function (req, res) {
    var error = validationResult(req);
    /* console.log(error.mapped) */

    if (error.isEmpty()) {

      users.findAll().then((users) => {

        const user = users.find(user => user.email == req.body.email);
        /* console.log(user) */

        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            delete user.password;
            req.session.user = user;
            res.redirect("/");
          } else {
            res.render("login", {
              errors: { password: { msg: "El password es incorrecto" } },
              user: req.body,
              body: req.body,
            });
          }
        }

      })

    } else {
      res.render("login", { errors: error.mapped(), body: req.body });
    }
  },



  // estoy mandando los archivos ejs con render
  // puedo llamarlos con o sin ".ejs"

  // este metodo finaliza la sesion del usuario
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  // este metodo me trae la vista del register
  register: function (req, res) {
    res.render("register");
  },
  // este metodo me trae la vista del perfil de usuario
  profile: function (req, res) {
    res.render("profile.ejs");
  },

  // este metodo es para registrar usuarios nuevos
  store: (req, res) => {

    let error = validationResult(req);

    if (error.isEmpty()) {

      users.findAll().then((newUsers) => {
        const user = newUsers.find(user => user.email == req.body.email);
        if (user) {
          /* return res.send('el correo esta en uso'); */
          return res.render("register", {
            errors: { emailRepeat: { msg: "el correo ya esta registrado, intenta con otro correo" } }
          });

        } else {
          let newUser = req.body;
          newUser.avatar = 'default.png';
          newUser.category_id = 2; // normal user
          newUser.password = bcrypt.hashSync(req.body.password, 10);

          users.create(newUser)
            .then(newUser => {
              req.session.user = newUser
              return res.redirect('/')
            })
        }
      })

    } else {
      res.render("register", { errors: error.mapped(), body: req.body });
    }

  }

};

// EXPORT
module.exports = userController;
