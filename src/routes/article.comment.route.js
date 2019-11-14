const express = require('express');
const commentController = require('../controllers/article.comment.controller');
const verifyToken = require('../middlewares/token.middleware');
const validate = require('../middlewares/helpers/validate');

const router = express.Router();

router.post('/articles/:articleid/comments',
  verifyToken.verify,
  validate.validateParams(validate.schemas.articleIdSchema),
  validate.validateBody(validate.schemas.createComment),
  commentController.createComment);

module.exports = router;
