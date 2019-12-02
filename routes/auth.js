const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// define the routes
router.put('/signup', authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;
