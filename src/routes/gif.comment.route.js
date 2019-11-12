const express = require('express');
const commentController = require('../controllers/gif.comment.controller');
const verifyToken = require('../middlewares/token.middleware');

const router = express.Router();

router.post('/gifs/:gifid/comments', verifyToken.verify, commentController.createComment);

module.exports = router;
