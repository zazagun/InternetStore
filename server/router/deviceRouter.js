const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require("../middleware/ckeckRoleMiddleware")
const { createLimiter, generalLimiter } = require("../middleware/rateLimitMiddleware")

router.post('/', createLimiter, checkRole("ADMIN"), deviceController.create)
router.get('/', generalLimiter, deviceController.getAll)
router.get('/:id', generalLimiter, deviceController.getOne)

module.exports = router