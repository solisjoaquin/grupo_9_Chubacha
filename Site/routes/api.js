var express = require('express')
const cors = require("cors");
var router = express.Router()
var controller = require('../controllers/apiControllers')

router.use(cors());
router.get('/products', controller.products);
router.get('/users', controller.users)

module.exports = router