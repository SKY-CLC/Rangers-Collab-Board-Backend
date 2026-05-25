const express = require('express');
const router = express.Router();

const shapeController = require('../controllers/shapeController');
const {authUser} = require('../middlewares/auth.middleware');

router.post('/',authUser,shapeController.createShape);
router.get('/board/:boardId',authUser,shapeController.getShape);
router.patch('/:shapeId',authUser,shapeController.updateShape);
router.delete('/:shapeId',authUser,shapeController.deleteShape);

module.exports = router;