const express = require('express');
const articleController = require('../controllers/article.controller');
const verifyToken = require('../middlewares/token.middleware');
const validate = require('../middlewares/helpers/validate');

const router = express.Router();

router.post('/articles',
  verifyToken.verify,
  validate.validateBody(validate.schemas.createArticleSchema),
  articleController.createArticle);

router.get('/articles/:articleid',
  verifyToken.verify,
  validate.validateParams(validate.schemas.articleIdSchema),
  articleController.getArticle);

router.get('/category/:categoryName',
  verifyToken.verify,
  validate.validateParams(validate.schemas.articleCategorySchema),
  articleController.getByCategory);

router.patch('/articles/:articleid',
  verifyToken.verify,
  validate.validateParams(validate.schemas.articleIdSchema),
  validate.validateBody(validate.schemas.createArticleSchema),
  articleController.editArticle);

router.delete('/articles/:articleid',
  verifyToken.verify,
  validate.validateParams(validate.schemas.articleIdSchema),
  articleController.deleteArticle);

module.exports = router;
