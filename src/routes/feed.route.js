const express = require('express');
const feedController = require('../controllers/feed.controller');
const verifyToken = require('../middlewares/token.middleware');

const router = express.Router();

router.get('/feed', verifyToken.verify, feedController.getFeed);

module.exports = router;
