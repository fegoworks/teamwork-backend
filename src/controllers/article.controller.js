const Article = require('../models/article.model.js');
const query = require('../db/index');
const userController = require('../controllers/user.controller');

const articleController = {
  async createArticle(req, res) {
    const {
      id,
    } = req;

    const user = await userController.getAUser(id);
    let newArticle = new Article();
    newArticle = {
      ...req.body,
    };

    const {
      userid,
    } = user;
    newArticle.owner = userid;

    const text = `INSERT INTO
        articles(title, message, owner)
        VALUES($1, $2, $3)
        returning *`;

    const values = [
      newArticle.title,
      newArticle.message,
      newArticle.owner,
    ];

    try {
      const {
        rows,
      } = await query(text, values);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: rows[0].articleid,
          createdOn: rows[0].createdOn,
          title: rows[0].title,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'Request failed',
        error,
      });
    }
  },

  async editArticle(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE articleid=$1';
    const updateOneQuery = `UPDATE articles
      SET title=$1,message=$2,createdon=$3,owner=$4
      WHERE articleid=$5 returning *`;

    try {
      const {
        rows,
      } = await query(findOneQuery, [req.params.articleid]);
      if (!rows[0]) {
        return res.status(404).send({
          message: 'article not found',
        });
      }
      if (rows[0].owner !== req.id) {
        return res.status(403).json({
          message: 'This article was not created by you',
        });
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.message || rows[0].message,
        new Date(),
        req.id,
        req.params.articleid || rows[0].articleId,
      ];
      const response = await query(updateOneQuery, values);


      const {
        title,
        message,
      } = response.rows[0];


      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Article updated successfully',
          title,
          article: message,
        },
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

module.exports = articleController;
