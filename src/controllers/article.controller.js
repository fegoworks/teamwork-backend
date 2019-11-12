const uuid = require('uuidv4').default;
const Article = require('../models/article.model.js');
const query = require('../db/index');
const getRows = require('../middlewares/helpers/helper');


const articleController = {
  /**
   * Create An Article
   * @param {object} req
   * @param {object} res
   * @returns {object} article object
   */
  async createArticle(req, res) {
    const sql = ` SELECT * FROM users WHERE userid ='${req.id}';`;
    const user = await getRows(sql);
    let newArticle = new Article();
    newArticle = {
      ...req.body,
    };

    const {
      userid,
    } = user;
    newArticle.owner = userid;

    const text = `INSERT INTO
        articles(articleid, title, message, owner)
        VALUES($1, $2, $3, $4)
        returning *`;

    const values = [
      uuid(),
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
          createdOn: rows[0].createdon,
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

  /**
   * Update An Article
   * @param {object} req
   * @param {object} res
   * @returns {object} updated article
   */

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

  /**
   * Delete An Article
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */

  async deleteArticle(req, res) {
    const deleteQuery = 'DELETE FROM articles WHERE articleid=$1 returning *';
    try {
      const sql = ` SELECT * FROM articles WHERE articleid ='${req.params.articleid}';`;
      const article = await getRows(sql);
      if (article === undefined) {
        return res.status(404).json({
          message: 'article was not found',
        });
      }

      if (article.owner === req.id) {
        const {
          rows,
        } = await query(deleteQuery, [req.params.articleid]);

        return res.status(200).json({
          status: 'Success',
          data: {
            message: 'article successfully deleted',
            articleid: rows[0].articleid,
          },
        });
      }

      return res.status(401).json({
        message: 'Unauthorized request',
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

module.exports = articleController;
