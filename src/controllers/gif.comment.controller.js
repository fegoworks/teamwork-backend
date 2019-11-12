const uuid = require('uuidv4').default;
const GifComment = require('../models/gifs.comments.model');
const query = require('../db/index');
const getRows = require('../middlewares/helpers/helper');

const commentController = {

  /**
   * Create a gif comment
   * @param {object} req
   * @param {object} res
   * @returns {object} comment object
   */
  async createComment(req, res) {
    const sql = ` SELECT * FROM gifs WHERE gifid ='${req.params.gifid}';`;
    const gif = await getRows(sql);
    if (gif === undefined) {
      return res.status(404).json({
        message: 'GIF post was not found',
      });
    }

    let newComment = new GifComment();
    newComment = {
      ...req.body,
    };

    newComment.owner = req.id;

    const text = `INSERT INTO
        gifcomments(commentid, gifid, comment, owner)
        VALUES($1, $2, $3, $4)
        returning *`;

    const values = [
      uuid(),
      req.params.gifid,
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
          gifTitle: gif.title,
          gif: gif.message,
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
