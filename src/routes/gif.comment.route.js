const express = require('express');
const commentController = require('../controllers/gif.comment.controller');
const verifyToken = require('../middlewares/token.middleware');
const validate = require('../middlewares/helpers/validate');

const router = express.Router();

router.post('/gifs/:gifid/comments',
  verifyToken.verify,
  validate.validateParams(validate.schemas.gifIdSchema),
  validate.validateBody(validate.schemas.createComment),
  commentController.createComment);

module.exports = router;
