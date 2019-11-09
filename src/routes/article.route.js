const express = require('express');
const articleController = require('../controllers/article.controller');
const verifyToken = require('../middlewares/token.middleware');

const router = express.Router();

router.post('/articles', verifyToken.verify, articleController.createArticle);

module.exports = router;
