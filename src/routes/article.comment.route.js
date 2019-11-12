const express = require('express');
const commentController = require('../controllers/article.comment.controller');
const verifyToken = require('../middlewares/token.middleware');

const router = express.Router();

router.post('/articles/:articleid/comments', verifyToken.verify, commentController.createComment);

module.exports = router;
