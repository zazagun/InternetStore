const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")
const authMiddleware = require("../mIddleware/authMiddleware")

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)//проверить путь до middleware

module.exports = router