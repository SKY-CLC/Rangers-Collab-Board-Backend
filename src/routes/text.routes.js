const express = require('express');
const router = express.Router();

const textController = require('../controllers/textController');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/',authUser,textController.);

module.exports = router;