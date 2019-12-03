const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const isAuth = require('../middlewares/isAuth');

// define the routes

// please note that for easier testing, I removed the isAuth middleware for now.
router.post('/comment', commentsController.addComment);

module.exports = router;
