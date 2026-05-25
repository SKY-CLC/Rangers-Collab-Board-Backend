const express = require('express');
const router = express.Router();

const shapeController = require('../controllers/shapeController');
const {authUser} = require('../middlewares/auth.middleware');

router.post('/',authUser,shapeController.createShape);
router.get('/board/:boardId',authUser,shapeController.)

module.exports = router;