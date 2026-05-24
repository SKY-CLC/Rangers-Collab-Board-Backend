const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const {authUser} = require('../middlewares/auth.middleware')


router.post('/',authUser,boardController.createBoard);



module.exports = router;