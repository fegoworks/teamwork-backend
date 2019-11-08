const express = require('express');

const router = express.Router();

const Article = require('../models/article.model.js');
const query = require('../db/index');

router.post('/articles', async (req, res) => {
  let newArticle = new Article();
  newArticle = {
    ...req.body,
  };
});
