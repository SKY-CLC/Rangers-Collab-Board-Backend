const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const {authUser} = require('../middlewares/auth.middleware')


router.post('/',authUser,boardController.createBoard);
router.get('/',authUser,boardController.getAllBoards);
router.patch('/:boardId',authUser,boardController.renameBoard);
router.delete('/:boardId',authUser,boardController.deleteBoard);
router.patch('/:boardId/join',authUser,boardController.joinBoard);



module.exports = router;