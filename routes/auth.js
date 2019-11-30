const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// define the routes
router.get('/', authController.getUsers);

module.exports = router;
