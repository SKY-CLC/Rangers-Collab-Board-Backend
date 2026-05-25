const express = require('express');
const router = express.Router();

const analyticsController = require('../controllers/analyticsController');
const { authUser } = require('../middlewares/auth.middleware')

router.get('/:boardId',authUser,analyticsController.getBoardAnalytics)

module.exports = router;