var express = require('express')
var router = express.Router()
var controller = require('../controllers/indexController.js')

router.get('/', controller.index)

module.exports = router
