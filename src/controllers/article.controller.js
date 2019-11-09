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
};

module.exports = articleController;
