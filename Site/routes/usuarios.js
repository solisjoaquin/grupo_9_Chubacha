var express = require('express')
var router = express.Router()
var userController = require('../controllers/userControllers.js')

router.get('/', userController.index)

router.get('/login', userController.login)

router.get('/register', userController.register)

router.get('/profile', userController.profile)

module.exports = router
