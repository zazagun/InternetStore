const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require("../middleware/ckeckRoleMiddleware")
const { createLimiter, generalLimiter } = require("../middleware/rateLimitMiddleware")

router.post('/', createLimiter, checkRole("ADMIN"), typeController.create)
router.get('/', generalLimiter, typeController.getAll)

module.exports = router


