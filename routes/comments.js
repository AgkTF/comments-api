const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

// define the routes

router.post('/comment', commentsController.addComment);

module.exports = router;
