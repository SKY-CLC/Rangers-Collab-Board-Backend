const express = require('express');
const router =  express.Router();

const cardController = require('../controllers/cardController');
const { authUser } = require('../middlewares/auth.middleware');


router.post('/',authUser,cardController.)




module.exports = router