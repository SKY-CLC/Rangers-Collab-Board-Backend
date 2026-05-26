const express = require('express');
const multer = require('multer');
const router =  express.Router();

const cardController = require('../controllers/cardController');
const { authUser } = require('../middlewares/auth.middleware');

const upload = multer({storage: multer.memoryStorage()})


router.post('/',authUser,cardController.createCard);
router.post('/:cardId/attachment',authUser,upload.single("image"),cardController.addAttachment)


module.exports =  router;