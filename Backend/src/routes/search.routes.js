const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');
const { authUser } = require('../middlewares/auth.middleware');

router.get('/',authUser,searchController);

module.exports = router;