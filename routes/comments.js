const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

// define the routes

router.get('/comments', commentsController.getComments);

module.exports = router;
