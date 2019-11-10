const express = require('express');
const articleController = require('../controllers/article.controller');
const verifyToken = require('../middlewares/token.middleware');

const router = express.Router();

router.post('/articles', verifyToken.verify, articleController.createArticle);
router.patch('/articles/:articleid', verifyToken.verify, articleController.editArticle);

module.exports = router;
