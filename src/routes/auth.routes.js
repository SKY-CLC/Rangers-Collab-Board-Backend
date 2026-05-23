const express = require('express');
const router  = express.Router();
const authController = require('../controllers/authController');
const { authUser } = require('../middlewares/auth.middleware')

router.post('/register',authController.registerController)
router.post('/login',authController.loginController);
router.get('/me',authUser,authController.getCurrentUser)

module.exports = router;