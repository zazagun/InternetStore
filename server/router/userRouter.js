const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const { authLimiter } = require("../middleware/rateLimitMiddleware")

router.post('/registration', authLimiter, userController.registration)
router.post('/login', authLimiter, userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router