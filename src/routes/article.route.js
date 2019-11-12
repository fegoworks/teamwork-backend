const express = require('express');
const articleController = require('../controllers/article.controller');
const verifyToken = require('../middlewares/token.middleware');

const router = express.Router();

router.post('/articles', verifyToken.verify, articleController.createArticle);
router.get('/articles/:articleid', verifyToken.verify, articleController.getArticle);
router.patch('/articles/:articleid', verifyToken.verify, articleController.editArticle);
router.delete('/articles/:articleid', verifyToken.verify, articleController.deleteArticle);

module.exports = router;
