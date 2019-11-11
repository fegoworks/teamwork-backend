const fs = require('fs');
const Gif = require('../models/gifs.model');
const query = require('../db/index');
const userController = require('../controllers/user.controller');
const cloudinary = require('../config/cloudinary');

const gifController = {
  async createGif(req, res) {
    const user = await userController.getAUser(req.id);
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
        gifs(title, imageurl, owner)
        VALUES($1, $2, $3)
        returning *`;

      const values = [
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

  async deleteGif(req, res) {
    const deleteQuery = 'DELETE FROM gifs WHERE gifid=$1 returning *';
    try {
      const {
        rows,
      } = await query(deleteQuery, [req.params.gifid]);
      if (!rows[0]) {
        return res.status(404).json({
          message: 'GIF post not found',
        });
      }
      if (rows[0].owner !== req.id) {
        return res.status(403).json({
          message: 'This GIF was not posted by you',
        });
      }
      return res.status(200).json({
        status: 'Success',
        data: {
          message: 'GIF post successfully deleted',
        },
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
