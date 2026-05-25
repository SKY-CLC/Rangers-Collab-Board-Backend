const express = require('express');
const router = express.Router();

const shapeController = require('../controllers/shapeController');
const {authUser} = require('../middlewares/auth.middleware');

router.post('/',authUser,shapeController.)

module.exports = router;