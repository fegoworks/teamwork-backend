const uuid = require('uuidv4').default;
const ArticleComment = require('../models/article.comments.model');
const query = require('../db/index');
const getRows = require('../middlewares/helpers/helper');

const commentController = {

  /**
   * Create an article comment
   * @param {object} req
   * @param {object} res
   * @returns {object} comment object
   */
  async createComment(req, res) {
    const sql = ` SELECT * FROM articles WHERE articleid ='${req.params.articleId}';`;
    const article = await getRows(sql);
    if (article === undefined) {
      return res.status(404).json({
        message: 'article was not found',
      });
    }

    let newComment = new ArticleComment();
    newComment = {
      ...req.body,
    };

    newComment.owner = req.id;

    const text = `INSERT INTO
        articlecomments(commentid, articleid, comment, owner)
        VALUES($1, $2, $3, $4)
        returning *`;

    const values = [
      uuid(),
      req.params.articleId,
      newComment.comment,
      newComment.owner,
    ];

    try {
      const {
        rows,
      } = await query(text, values);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment successfully created',
          createdOn: rows[0].createdon,
          articleTitle: article.title,
          article: article.message,
          comment: rows[0].comment,
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

module.exports = commentController;