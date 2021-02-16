const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const cartValidations = require('../validations/cartValidations')
const auth = require('../middlewares/auth')


router.post('/',auth, cartValidations.addtocart, cartController.addtocart)
router.delete('/',auth,cartController.emptycart)

module.exports = router