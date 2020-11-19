var express = require('express')
var router = express.Router()
var userController = require('../controllers/userControllers.js')
var path = require('path')
var multer = require('multer')
const validate = require('../validators/users')

const userRoutes = require('../middlewares/guestRouter')


let { check, validationResult, body } = require('express-validator')



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data')
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

router.get('/', userController.index)
// Login de usuario 
router.get('/login', userRoutes, userController.login)
router.post('/login', validate.login, userController.authenticate)
router.get('/logout', userController.logout);
router.get('/register', userRoutes, userController.register)
router.post('/register', validate.register, userController.store)

router.get('/profile', userController.profile)

module.exports = router
