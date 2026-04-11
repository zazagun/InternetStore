const Router = require("express")
const router = new Router()
const brandController = require("../controllers/brandController")
const checkRole = require("../middleware/ckeckRoleMiddleware")
const { createLimiter, generalLimiter } = require("../middleware/rateLimitMiddleware")

router.post('/', createLimiter, checkRole("ADMIN"), brandController.create)
router.get('/', generalLimiter, brandController.getAll)

module.exports = router 