const Router = require('express')
const router = new Router()

const basketController = require("../controllers/basketController")
const authCheck = require("../mIddleware/authMiddleware")

router.post('/', authCheck, basketController.addDevice)
router.get('/', authCheck, basketController.getAll)
router.delete('/', authCheck, basketController.deleteFromBasket)


module.exports = router