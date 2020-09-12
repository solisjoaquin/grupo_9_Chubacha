// IMPORTS
const fs = require('fs')
const { profile } = require('console')
const bcrypt = require('bcryptjs')
const cookie = require('cookie-parser')

// ACTION
const userController = {
  index: function (req, res) {
    res.send('lista de usuarios')
  },
  login: function (req, res) {
    res.render('login')
  },

  // estoy mandando los archivos ejs con render
  // puedo llamarlos con o sin ".ejs"
  register: function (req, res) {
    res.render('register')
  },
  profile: function (req, res) {
    res.render('profile.ejs')
  }
}

// EXPORT
module.exports = userController
