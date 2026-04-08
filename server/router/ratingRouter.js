const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/:id', authMiddleware, ratingController.addRating)
router.get('/totalRates/:id', ratingController.getTotalRates)

module.exports = router;