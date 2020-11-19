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
      res.render("login", { errors: error.mapped(), body: req.body });
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


  /*     let newUser = req.body;
      newUser.avatar = 'default.png';
      newUser.category_id = 2; // normal user
      newUser.password = bcrypt.hashSync(req.body.password, 10);
  
  
      users.create(newUser)
        .then(newUser => {
          req.session.user = newUser
          return res.redirect('/')
        })
   */

  /*     let newUser = req.body;
  
      users.findAll().then((users) => {
  
        const userEmailCheck = users.find(user => user.email == req.body.email);
  
        if (userEmailCheck) {
  
          res.render("register", {
            errors: { email: { msg: "El email ya esta existe para otro usuario" } },
            user: req.body,
          });
  
        } else {
  
          newUser.password = bcrypt.hashSync(req.body.password, 10);
          users.create(newUser)
            .then(newUser => {
              req.session.user = newUser;
              return res.redirect('/')
            })
        }
  
      }) */



};

// EXPORT
module.exports = userController;
