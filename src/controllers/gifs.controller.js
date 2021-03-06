/* eslint-disable no-use-before-define */
const fs = require('fs');
const uuid = require('uuidv4').default;
const Gif = require('../models/gifs.model');
const query = require('../db/index');
const getRows = require('../middlewares/helpers/helper');
const cloudinary = require('../config/cloudinary');


const gifController = {
  /**
   * Create a GIF post
   * @param {object} req
   * @param {object} res
   * @returns {object} GIF object
   */
  async createGif(req, res) {
    const sql = ` SELECT * FROM users WHERE userid ='${req.id}';`;
    const user = await getRows(sql);

    let newGif = new Gif();
    newGif = {
      ...req.body,
    };

    const {
      userid,
    } = user;
    newGif.owner = userid;

    // Get cloudinary details
    if (req.file === undefined) {
      return res.status(403).json({
        status: 'Request failed',
        message: 'Err: No file selected',
      });
    }
    const url = await cloudLink(req.file);
    newGif.imageUrl = url.url;

    try {
      const text = `INSERT INTO
        gifs(gifid, title, imageurl, owner)
        VALUES($1, $2, $3, $4)
        returning *`;

      const values = [
        uuid(),
        newGif.title,
        newGif.imageUrl,
        newGif.owner,
      ];

      const {
        rows,
      } = await query(text, values);

      return res.status(200).json({
        status: 'success',
        data: {
          gifId: rows[0].gifid,
          message: 'GIF image successfully posted',
          createdOn: rows[0].createdon,
          title: rows[0].title,
          imageUrl: rows[0].imageurl,
        },
      });
    } catch (error) {
      return res.status(403).json({
        error,
      });
    }
  },

  /**
   * Get A Gif post
   * @param {object} req
   * @param {object} res
   * @returns {object} gif object
   */

  async getGif(req, res) {
    const sql1 = 'SELECT * FROM gifs WHERE gifid= $1';
    const sql2 = 'SELECT * FROM gifcomments WHERE gifid=$1';
    const commentArr = [];

    try {
      const {
        rows: gif,
      } = await query(sql1, [req.params.gifId]);
      const {
        rows: commentrows,
      } = await query(sql2, [req.params.gifId]);

      commentrows.forEach((item) => {
        const comment = {
          commentId: item.commentid,
          comment: item.comment,
          authorId: item.owner,
        };
        commentArr.push(comment);
      });

      return res.status(200).json({
        status: 'success',
        data: {
          id: gif[0].gifid,
          createdOn: gif[0].createdon,
          title: gif[0].title,
          url: gif[0].imageurl,
          comments: commentArr,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Delete A GIF post
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */

  async deleteGif(req, res) {
    const deleteQuery = 'DELETE FROM gifs WHERE gifid=$1 returning *';
    try {
      const sql = ` SELECT * FROM gifs WHERE gifid ='${req.params.gifId}';`;
      const gif = await getRows(sql);
      if (gif === undefined) {
        return res.status(404).json({
          message: 'GIF post was not found',
        });
      }
      if (gif.owner === req.id) {
        const {
          rows,
        } = await query(deleteQuery, [req.params.gifId]);

        return res.status(200).json({
          status: 'Success',
          data: {
            message: 'GIF post successfully deleted',
            gifId: rows[0].gifid,
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

const cloudLink = async (file) => {
  try {
    // Upload file to cloudinary
    const uploader = async (path) => cloudinary.uploads(path, 'Images');
    const {
      path,
    } = file;
    const url = await uploader(path);
    fs.unlinkSync(path);

    return url;
  } catch (error) {
    return {
      status: 'Request failed',
      error,
    };
  }
};

module.exports = gifController;