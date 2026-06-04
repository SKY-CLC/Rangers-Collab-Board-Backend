const express = require('express');
const multer = require('multer');
const router =  express.Router();

const cardController = require('../controllers/cardController');
const { authUser } = require('../middlewares/auth.middleware');

const upload = multer({storage: multer.memoryStorage()})


router.post('/',authUser,cardController.createCard);
router.get('/board/:boardId',authUser,cardController.getAllCards);
router.get('/:cardId',authUser,cardController.getSingleCard);
router.patch('/:cardId',authUser,cardController.updateCard);
router.delete('/:cardId',authUser,cardController.deleteCard);
router.post('/:cardId/attachment',authUser,upload.single("image"),cardController.addAttachment);
router.delete('/:cardId/attachment',authUser,cardController.deleteAttachment);


module.exports =  router;