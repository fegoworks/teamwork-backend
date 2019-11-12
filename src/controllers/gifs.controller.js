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
        message: 'GIF image successfully posted',
        data: {
          gifId: rows[0].gifid,
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
   * Delete A GIF post
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */

  async deleteGif(req, res) {
    const deleteQuery = 'DELETE FROM gifs WHERE gifid=$1 returning *';
    try {
      const sql = ` SELECT * FROM gifs WHERE gifid ='${req.params.gifid}';`;
      const gif = await getRows(sql);
      if (gif === undefined) {
        return res.status(404).json({
          message: 'GIF post was not found',
        });
      }
      if (gif.owner === req.id) {
        const {
          rows,
        } = await query(deleteQuery, [req.params.gifid]);


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
