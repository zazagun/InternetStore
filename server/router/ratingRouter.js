const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:id', authMiddleware, ratingController.addRating);
router.get('/:id', ratingController.getAllRating);
router.get('/:id/user', authMiddleware, ratingController.getRatingOne);

module.exports = router;