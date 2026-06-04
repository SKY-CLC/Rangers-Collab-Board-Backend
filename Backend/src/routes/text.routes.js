const express = require('express');
const router = express.Router();

const textController = require('../controllers/textController');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/',authUser,textController.createText);
router.get('/board/:boardId',authUser,textController.getTexts);
router.patch('/:textId',authUser,textController.updateText);
router.delete('/:textId',authUser,textController.deleteText);

module.exports = router;